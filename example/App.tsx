import * as React from "react";
import { ExpoM3ProgressView } from "expo-m3-progress";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Switch,
  SafeAreaView,
  Dimensions,
} from "react-native";

const { width } = Dimensions.get("window");

// Material 3 Color Palette (Baseline)
const M3_COLORS = {
  primary: "#6750A4",
  onPrimary: "#FFFFFF",
  primaryContainer: "#EADDFF",
  onPrimaryContainer: "#21005D",
  surface: "#FEF7FF",
  surfaceVariant: "#E7E0EB",
  onSurface: "#1D1B20",
  onSurfaceVariant: "#49454F",
  outline: "#79747E",
};

export default function App() {
  const [isWavy, setIsWavy] = React.useState(true);
  const [isIndeterminate, setIsIndeterminate] = React.useState(true);
  const [progress, setProgress] = React.useState(0.5);
  const [amplitude, setAmplitude] = React.useState(4);
  const [length, setLength] = React.useState(24);
  const [speed, setSpeed] = React.useState(2);
  const [cornerRadius, setCornerRadius] = React.useState(10);
  const [thickness, setThickness] = React.useState(8);
  const [gap, setGap] = React.useState(6);
  const [stopSize, setStopSize] = React.useState(8);
  const [circularSize, setCircularSize] = React.useState(64);

  const [hue, setHue] = React.useState(260); // M3 Purple
  const [trackHue, setTrackHue] = React.useState(260);
  const [trackOpacity, setTrackOpacity] = React.useState(0.15);

  const indicatorColor = `hsl(${hue}, 70%, 50%)`;
  const trackColor = `rgba(${parseInt(M3_COLORS.primary.slice(1, 3), 16)}, ${parseInt(M3_COLORS.primary.slice(3, 5), 16)}, ${parseInt(M3_COLORS.primary.slice(5, 7), 16)}, ${trackOpacity})`;

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Material 3 Progress</Text>

        <View style={styles.previewSection}>
          <M3Card label="Linear Indicator">
            <ExpoM3ProgressView
              variant="linear"
              wavy={isWavy}
              waveAmplitude={amplitude}
              wavelength={length}
              waveSpeed={speed}
              trackCornerRadius={cornerRadius}
              trackThickness={thickness}
              indicatorTrackGap={gap}
              trackStopIndicatorSize={stopSize}
              indeterminate={isIndeterminate}
              progress={progress}
              indicatorColor={indicatorColor}
              trackColor={trackColor}
              style={{ width: '100%', height: thickness + (gap * 2) }}
            />
          </M3Card>

          <M3Card label="Circular Indicator" center>
            <ExpoM3ProgressView
              variant="circular"
              wavy={isWavy}
              waveAmplitude={amplitude}
              wavelength={length}
              waveSpeed={speed}
              indicatorSize={circularSize}
              trackThickness={thickness}
              indicatorTrackGap={gap}
              trackCornerRadius={cornerRadius}
              indeterminate={isIndeterminate}
              progress={progress}
              indicatorColor={indicatorColor}
              trackColor={trackColor}
              style={{ width: circularSize, height: circularSize }}
            />
          </M3Card>
        </View>

        <View style={styles.controlsCard}>
          <Text style={styles.sectionTitle}>Configurations</Text>

          <View style={styles.row}>
            <Text style={styles.controlLabel}>Wavy Animation</Text>
            <Switch
              value={isWavy}
              onValueChange={setIsWavy}
              trackColor={{ true: M3_COLORS.primaryContainer }}
              thumbColor={isWavy ? M3_COLORS.primary : "#fff"}
            />
          </View>

          <View style={styles.row}>
            <Text style={styles.controlLabel}>Indeterminate</Text>
            <Switch
              value={isIndeterminate}
              onValueChange={setIsIndeterminate}
              trackColor={{ true: M3_COLORS.primaryContainer }}
              thumbColor={isIndeterminate ? M3_COLORS.primary : "#fff"}
            />
          </View>

          <View style={styles.divider} />

          <ControlSlider
            label={`Thickness: ${thickness.toFixed(0)}dp`}
            value={thickness}
            onChange={setThickness}
            min={2}
            max={20}
          />

          <ControlSlider
            label={`Corner Radius: ${cornerRadius.toFixed(0)}dp`}
            value={cornerRadius}
            onChange={setCornerRadius}
            min={0}
            max={20}
          />

          <ControlSlider
            label={`Indicator-Track Gap: ${gap.toFixed(0)}dp`}
            value={gap}
            onChange={setGap}
            min={0}
            max={20}
          />

          <ControlSlider
            label={`Stop dots size: ${stopSize.toFixed(0)}dp`}
            value={stopSize}
            onChange={setStopSize}
            min={0}
            max={20}
          />

          <ControlSlider
            label={`Circular Size: ${circularSize.toFixed(0)}dp`}
            value={circularSize}
            onChange={setCircularSize}
            min={32}
            max={150}
          />

          <ControlSlider
            label={`Progress: ${Math.round(progress * 100)}%`}
            value={progress}
            onChange={setProgress}
            min={0}
            max={1}
            disabled={isIndeterminate}
          />

          {isWavy && (
            <View style={styles.wavySection}>
              <Text style={styles.subTitle}>Wavy Parameters</Text>
              <ControlSlider
                label={`Amplitude: ${amplitude.toFixed(1)}`}
                value={amplitude}
                onChange={setAmplitude}
                min={0}
                max={15}
              />
              <ControlSlider
                label={`Length: ${length.toFixed(0)}`}
                value={length}
                onChange={setLength}
                min={8}
                max={120}
              />
              <ControlSlider
                label={`Speed: ${speed.toFixed(1)}`}
                value={speed}
                onChange={setSpeed}
                min={0}
                max={20}
              />
            </View>
          )}

          <View style={styles.divider} />

          <View style={styles.colorSection}>
            <Text style={styles.controlLabel}>Indicator Hue</Text>
            <HuePicker hue={hue} onChange={setHue} color={indicatorColor} />
          </View>

          <View style={styles.colorSection}>
            <Text style={styles.controlLabel}>Track Appearance (Opacity)</Text>
            <ControlSlider
              label={`Track Visibility: ${Math.round(trackOpacity * 100)}%`}
              value={trackOpacity}
              onChange={setTrackOpacity}
              min={0}
              max={0.5}
              style={{ marginTop: 8 }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function M3Card({ label, children, center }: { label: string, children: React.ReactNode, center?: boolean }) {
  return (
    <View style={styles.previewCard}>
      <Text style={styles.cardLabel}>{label}</Text>
      <View style={[styles.indicatorWrapper, center && styles.center]}>
        {children}
      </View>
    </View>
  );
}

function HuePicker({ hue, onChange, color }: { hue: number, onChange: (h: number) => void, color: string }) {
  const onTouch = (e: any) => {
    const availableWidth = width - 80;
    const x = e.nativeEvent.locationX;
    const p = Math.max(0, Math.min(1, x / availableWidth));
    onChange(Math.round(p * 360));
  };

  return (
    <View style={styles.hueContainer}>
      <View
        onStartShouldSetResponder={() => true}
        onResponderRelease={onTouch}
        onMoveShouldSetResponder={() => true}
        onResponderMove={onTouch}
        style={styles.hueRail}
      >
        <View style={styles.hueStrip} />
        <View style={[styles.hueThumb, {
          left: `${(hue / 360) * 100}%`,
          backgroundColor: color
        }]} />
      </View>
    </View>
  );
}

function ControlSlider({
  label,
  value,
  onChange,
  min,
  max,
  disabled,
  style
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  disabled?: boolean;
  style?: any;
}) {
  const onTouch = (e: any) => {
    if (disabled) return;
    const availableWidth = width - 80;
    const x = e.nativeEvent.locationX;
    const progress = Math.max(0, Math.min(1, x / availableWidth));
    onChange(min + progress * (max - min));
  };

  const fillWidth = ((value - min) / (max - min)) * 100;

  return (
    <View style={[styles.sliderContainer, style, disabled && { opacity: 0.3 }]}>
      <View style={styles.sliderHeader}>
        <Text style={styles.sliderLabel}>{label}</Text>
      </View>
      <View
        onStartShouldSetResponder={() => !disabled}
        onResponderRelease={onTouch}
        onMoveShouldSetResponder={() => !disabled}
        onResponderMove={onTouch}
        style={styles.sliderRail}
      >
        <View style={[styles.sliderFill, { width: `${fillWidth}%`, backgroundColor: disabled ? M3_COLORS.outline : M3_COLORS.primary }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: M3_COLORS.surface,
  },
  container: {
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "700",
    color: M3_COLORS.onSurface,
    marginBottom: 20,
    textAlign: "center",
  },
  previewSection: {
    marginBottom: 16,
  },
  previewCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: M3_COLORS.surfaceVariant,
  },
  cardLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: M3_COLORS.onSurfaceVariant,
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 16,
  },
  indicatorWrapper: {
    height: 100, // Increased to accommodate thicker variants
    justifyContent: "center",
  },
  center: {
    alignItems: "center",
  },
  controlsCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: M3_COLORS.surfaceVariant,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: M3_COLORS.onSurface,
    marginBottom: 12,
  },
  subTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: M3_COLORS.primary,
    marginTop: 16,
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 48,
  },
  divider: {
    height: 1,
    backgroundColor: M3_COLORS.surfaceVariant,
    marginVertical: 12,
  },
  controlLabel: {
    fontSize: 14,
    color: M3_COLORS.onSurface,
    fontWeight: "500",
  },
  sliderContainer: {
    marginTop: 12,
  },
  sliderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  sliderLabel: {
    fontSize: 13,
    color: M3_COLORS.onSurfaceVariant,
  },
  sliderRail: {
    height: 8,
    backgroundColor: M3_COLORS.surfaceVariant,
    borderRadius: 4,
    overflow: "hidden",
  },
  sliderFill: {
    height: "100%",
  },
  colorSection: {
    marginTop: 12,
  },
  hueContainer: {
    marginTop: 8,
  },
  hueRail: {
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
  },
  hueStrip: {
    height: 12,
    borderRadius: 6,
    backgroundColor: M3_COLORS.surfaceVariant,
    borderWidth: 1,
    borderColor: M3_COLORS.outline,
    opacity: 0.5,
  },
  hueThumb: {
    position: "absolute",
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 4,
    borderColor: "#fff",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    transform: [{ translateX: -14 }],
  },
  wavySection: {
    paddingLeft: 8,
    borderLeftWidth: 2,
    borderLeftColor: M3_COLORS.primaryContainer,
    marginTop: 8,
  },
});
