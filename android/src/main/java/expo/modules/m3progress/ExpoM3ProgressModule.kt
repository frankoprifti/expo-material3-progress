package expo.modules.m3progress

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class ExpoM3ProgressModule : Module() {
  override fun definition() = ModuleDefinition {
    Name("ExpoM3Progress")

    View(ExpoM3ProgressView::class) {
      Prop("variant") { view: ExpoM3ProgressView, v: String? ->
        view.setVariant(v ?: "circular")
      }

      Prop("indeterminate") { view: ExpoM3ProgressView, v: Boolean? ->
        view.setIndeterminate(v ?: true)
      }

      Prop("progress") { view: ExpoM3ProgressView, v: Double? ->
        view.setProgress((v ?: 0.0).toFloat())
      }

      Prop("wavy") { view: ExpoM3ProgressView, v: Boolean? ->
        view.setWavy(v ?: false)
      }

      Prop("waveAmplitude") { view: ExpoM3ProgressView, v: Double? ->
        view.setWaveAmplitude((v ?: 0.0).toFloat())
      }

      Prop("wavelength") { view: ExpoM3ProgressView, v: Double? ->
        view.setWavelength((v ?: 0.0).toFloat())
      }

      Prop("waveSpeed") { view: ExpoM3ProgressView, v: Double? ->
        view.setWaveSpeed((v ?: 0.0).toFloat())
      }

      Prop("waveAmplitudeRampMin") { view: ExpoM3ProgressView, v: Double? ->
        view.setWaveAmplitudeRampMin((v ?: 0.1).toFloat())
      }

      Prop("waveAmplitudeRampMax") { view: ExpoM3ProgressView, v: Double? ->
        view.setWaveAmplitudeRampMax((v ?: 0.9).toFloat())
      }

      Prop("indicatorColor") { view: ExpoM3ProgressView, v: String? ->
        view.setIndicatorColor(v)
      }

      Prop("trackColor") { view: ExpoM3ProgressView, v: String? ->
        view.setTrackColor(v)
      }

      Prop("trackCornerRadius") { view: ExpoM3ProgressView, v: Int? ->
        view.setTrackCornerRadius(v ?: -1)
      }

      Prop("trackThickness") { view: ExpoM3ProgressView, v: Int? ->
        view.setTrackThickness(v ?: -1)
      }

      Prop("indicatorSize") { view: ExpoM3ProgressView, v: Int? ->
        view.setIndicatorSize(v ?: -1)
      }

      Prop("indicatorTrackGap") { view: ExpoM3ProgressView, v: Int? ->
        view.setIndicatorTrackGap(v ?: -1)
      }

      Prop("trackStopIndicatorSize") { view: ExpoM3ProgressView, v: Int? ->
        view.setTrackStopIndicatorSize(v ?: -1)
      }
    }
  }
}