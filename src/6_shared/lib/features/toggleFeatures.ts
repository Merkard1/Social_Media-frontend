import { FeatureFlags } from "../types/featureFlags";

import { getFeatureFlag } from "./setGetFeatures";

interface ToggleFeaturesOptions<T> {
  name: keyof FeatureFlags;
  on: () => T;
  off: () => T;
}

export function toggleFeatures<T>({ off, on, name }: ToggleFeaturesOptions<T>): T {
  return getFeatureFlag(name) ? on() : off();
}
