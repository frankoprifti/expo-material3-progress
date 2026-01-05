package expo.modules.m3progress

import android.content.Context
import android.graphics.Color
import android.util.TypedValue
import android.view.View
import android.widget.FrameLayout
import com.google.android.material.progressindicator.BaseProgressIndicator
import com.google.android.material.progressindicator.CircularProgressIndicator
import com.google.android.material.progressindicator.LinearProgressIndicator
import expo.modules.kotlin.AppContext
import expo.modules.kotlin.views.ExpoView
import java.lang.reflect.Method

class ExpoM3ProgressView(context: Context, appContext: AppContext) : ExpoView(context, appContext) {
  private val container = FrameLayout(context).also {
    it.layoutParams = LayoutParams(LayoutParams.MATCH_PARENT, LayoutParams.MATCH_PARENT)
    addView(it)
  }

  private var variant: String = "circular"
  private var indeterminate: Boolean = true
  private var progress: Float = 0f

  private var wavy: Boolean = false
  private var waveAmplitudeDp: Float = 0f
  private var wavelengthDp: Float = 0f
  private var waveSpeedDp: Float = 0f
  private var rampMin: Float = 0.1f
  private var rampMax: Float = 0.9f

  private var indicatorColorInt: Int? = null
  private var trackColorInt: Int? = null
  private var trackCornerRadius: Int = -1
  private var trackThickness: Int = -1
  private var indicatorSize: Int = -1
  private var indicatorTrackGap: Int = -1
  private var trackStopIndicatorSize: Int = -1

  private var currentIndicator: BaseProgressIndicator<*>? = null

  fun setVariant(v: String) {
    if (variant != v || currentIndicator == null) {
      variant = v
      rebuild()
    } else {
      applyToCurrent()
    }
  }

  fun setIndeterminate(v: Boolean) {
    if (indeterminate != v) {
      indeterminate = v
      applyToCurrent()
    }
  }

  fun setProgress(v: Float) {
    if (progress != v) {
      progress = v
      applyToCurrent()
    }
  }

  fun setWavy(v: Boolean) { wavy = v; applyToCurrent() }
  fun setWaveAmplitude(v: Float) { waveAmplitudeDp = v; applyToCurrent() }
  fun setWavelength(v: Float) { wavelengthDp = v; applyToCurrent() }
  fun setWaveSpeed(v: Float) { waveSpeedDp = v; applyToCurrent() }
  fun setWaveAmplitudeRampMin(v: Float) { rampMin = v; applyToCurrent() }
  fun setWaveAmplitudeRampMax(v: Float) { rampMax = v; applyToCurrent() }

  fun setIndicatorColor(color: String?) {
    indicatorColorInt = parseColorOrNull(color)
    applyToCurrent()
  }

  fun setTrackColor(color: String?) {
    trackColorInt = parseColorOrNull(color)
    applyToCurrent()
  }

  fun setTrackCornerRadius(radius: Int) {
    trackCornerRadius = radius
    applyToCurrent()
  }

  fun setTrackThickness(thickness: Int) {
    trackThickness = thickness
    applyToCurrent()
  }

  fun setIndicatorSize(size: Int) {
    indicatorSize = size
    applyToCurrent()
  }

  fun setIndicatorTrackGap(gap: Int) {
    indicatorTrackGap = gap
    applyToCurrent()
  }

  fun setTrackStopIndicatorSize(size: Int) {
    trackStopIndicatorSize = size
    applyToCurrent()
  }

  private fun rebuild() {
    container.removeAllViews()

    val indicator: BaseProgressIndicator<*> = if (variant == "linear") {
      LinearProgressIndicator(context).apply {
        layoutParams = FrameLayout.LayoutParams(
          FrameLayout.LayoutParams.MATCH_PARENT,
          FrameLayout.LayoutParams.WRAP_CONTENT,
          android.view.Gravity.CENTER
        )
      }
    } else {
      CircularProgressIndicator(context).apply {
        layoutParams = FrameLayout.LayoutParams(
          FrameLayout.LayoutParams.WRAP_CONTENT,
          FrameLayout.LayoutParams.WRAP_CONTENT,
          android.view.Gravity.CENTER
        )
      }
    }

    currentIndicator = indicator
    container.addView(indicator)
    applyToCurrent()
  }

  private fun dpToPx(dp: Float): Int =
    TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_DIP, dp, resources.displayMetrics).toInt()

  private fun parseColorOrNull(color: String?): Int? {
    if (color.isNullOrBlank()) return null
    return try {
      Color.parseColor(color)
    } catch (_: IllegalArgumentException) {
      null
    }
  }

  private fun applyToCurrent() {
    val indicator = currentIndicator ?: return

    // Standard properties
    if (indicator.isIndeterminate != indeterminate) {
      indicator.isIndeterminate = indeterminate
    }
    
    if (!indeterminate) {
      indicator.max = 1000
      val p = (progress.coerceIn(0f, 1f) * 1000).toInt()
      indicator.setProgressCompat(p, true)
    }

    // Colors
    indicatorColorInt?.let {
      indicator.setIndicatorColor(it)
    }
    trackColorInt?.let {
      indicator.trackColor = it
    }

    // Circular specific size
    if (indicator is CircularProgressIndicator) {
      indicator.indicatorSize = if (indicatorSize >= 0) dpToPx(indicatorSize.toFloat()) else dpToPx(48f)
    }

    // Thickness
    indicator.trackThickness = if (trackThickness >= 0) dpToPx(trackThickness.toFloat()) else dpToPx(4f)

    // Border Radius / Corner Radius
    if (trackCornerRadius >= 0) {
      indicator.trackCornerRadius = dpToPx(trackCornerRadius.toFloat())
    } else {
      indicator.trackCornerRadius = indicator.trackThickness / 2
    }

    // M3 Expressive properties
    val gapPx = if (indicatorTrackGap >= 0) dpToPx(indicatorTrackGap.toFloat()) else dpToPx(4f)
    val stopSizePx = if (trackStopIndicatorSize >= 0) dpToPx(trackStopIndicatorSize.toFloat()) else indicator.trackThickness

    // Apply to indicator AND its spec for maximum compatibility
    val spec = try {
      val f = BaseProgressIndicator::class.java.getDeclaredField("spec")
      f.isAccessible = true
      f.get(indicator)
    } catch (_: Throwable) { null }

    listOfNotNull(indicator, spec).forEach { target ->
      invokeMethod(target, "setIndicatorTrackGap", gapPx)
      invokeMethod(target, "setTrackGap", gapPx) // Fallback name
      
      if (indicator is LinearProgressIndicator) {
        invokeMethod(target, "setTrackStopIndicatorSize", stopSizePx)
      }
    }

    // Wavy props via reflection
    applyWaveProps(indicator)

    // Visibility and Animation
    indicator.visibility = View.VISIBLE
    if (indicator.isIndeterminate) {
       indicator.show()
    }
    indicator.invalidate()
  }

  private fun invokeMethod(obj: Any, methodName: String, value: Int) {
    try {
      var cls: Class<*>? = obj.javaClass
      var method: Method? = null
      while (cls != null && method == null) {
        try {
          method = cls.getMethod(methodName, Int::class.javaPrimitiveType)
        } catch (_: NoSuchMethodException) {
          try {
            method = cls.getDeclaredMethod(methodName, Int::class.javaPrimitiveType)
          } catch (_: NoSuchMethodException) {
            cls = cls.superclass
          }
        }
      }
      method?.isAccessible = true
      method?.invoke(obj, value)
    } catch (_: Throwable) {}
  }

  private fun applyWaveProps(indicator: BaseProgressIndicator<*>) {
    val spec = try {
      val f = BaseProgressIndicator::class.java.getDeclaredField("spec")
      f.isAccessible = true
      f.get(indicator)
    } catch (_: Throwable) { null }

    val target = spec ?: indicator

    try {
      if (wavy) {
        invokeMethod(target, "setWavelength", dpToPx(wavelengthDp))
        invokeMethod(target, "setWaveAmplitude", dpToPx(waveAmplitudeDp))
        invokeMethod(target, "setWaveSpeed", dpToPx(waveSpeedDp))
        
        // Ramp (Two floats)
        try {
          var cls: Class<*>? = target.javaClass
          var m: Method? = null
          while (cls != null && m == null) {
            try {
              m = cls.getDeclaredMethod("setWaveAmplitudeRampProgressRange", Float::class.javaPrimitiveType, Float::class.javaPrimitiveType)
            } catch (_: NoSuchMethodException) {
              cls = cls.superclass
            }
          }
          m?.isAccessible = true
          m?.invoke(target, rampMin, rampMax)
        } catch (_: Throwable) {}
      } else {
        invokeMethod(target, "setWavelength", 0)
        invokeMethod(target, "setWaveAmplitude", 0)
        invokeMethod(target, "setWaveSpeed", 0)
      }
    } catch (_: Throwable) {}
  }
}