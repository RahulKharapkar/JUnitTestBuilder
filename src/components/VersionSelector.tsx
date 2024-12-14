import React from 'react';
import { TestConfig } from '../types';
import { VERSION_OPTIONS } from '../config/constants';

interface VersionSelectorProps {
  config: TestConfig;
  onConfigChange: (config: TestConfig) => void;
}

export function VersionSelector({ config, onConfigChange }: VersionSelectorProps) {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-lg font-bold mb-2">
          JUnit Version
        </label>
        <select
          className="w-full neu-select"
          value={config.junitVersion}
          onChange={(e) => onConfigChange({ ...config, junitVersion: e.target.value })}
        >
          {VERSION_OPTIONS.JUNIT.map((version) => (
            <option key={version} value={version}>
              {version}
            </option>
          ))}
        </select>
        <p className="mt-2 text-sm">
          JUnit 5 is recommended for new projects. JUnit 4 is maintained for legacy support.
        </p>
      </div>

      <div>
        <label className="block text-lg font-bold mb-2">
          Mockito Version
        </label>
        <select
          className="w-full neu-select"
          value={config.mockitoVersion}
          onChange={(e) => onConfigChange({ ...config, mockitoVersion: e.target.value })}
        >
          {VERSION_OPTIONS.MOCKITO.map((version) => (
            <option key={version} value={version}>
              {version}
            </option>
          ))}
        </select>
        <p className="mt-2 text-sm">
          Choose a Mockito version compatible with your JUnit version.
        </p>
      </div>
    </div>
  );
}