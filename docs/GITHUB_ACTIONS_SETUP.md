# GitHub Actions Setup for Android APK Build

This repository includes a GitHub Actions workflow to automatically build Android APK files when code is pushed to the main or develop branches.

## Setup Instructions

### 1. Create an Expo Account
1. Go to [expo.dev](https://expo.dev) and create an account
2. Install EAS CLI locally: `npm install -g eas-cli`
3. Login: `eas login`

### 2. Configure Your Project
1. Run `eas build:configure` in your project directory
2. This will create/update the `eas.json` file with build configurations

### 3. Get Your Expo Token
1. Run `eas whoami` to confirm you're logged in
2. Run `npx expo login` if needed
3. Get your token from [expo.dev/accounts/[username]/settings/access-tokens](https://expo.dev/accounts/[username]/settings/access-tokens)
4. Create a new token with appropriate permissions

### 4. Add GitHub Secrets
Go to your GitHub repository → Settings → Secrets and variables → Actions → New repository secret:

- **Name**: `EXPO_TOKEN`
- **Value**: Your Expo access token from step 3

### 5. Trigger a Build
The workflow will automatically run when you:
- Push to `main` or `develop` branches
- Create a pull request to `main`
- Manually trigger it from the Actions tab

## Build Outputs

### Artifacts
- APK files are uploaded as GitHub Actions artifacts
- Available for 30 days after the build
- Can be downloaded from the Actions tab

### Releases (Main branch only)
- Automatic releases are created for builds from the `main` branch
- APK files are attached to the release
- Tagged with version number (v1, v2, etc.)

## Build Configuration

The `eas.json` file is configured to:
- Build APK files only (no AAB files)
- Use the `preview` profile for faster builds
- Target Android platform only

## Troubleshooting

### Common Issues:
1. **Missing EXPO_TOKEN**: Ensure the secret is properly set in GitHub
2. **Build failures**: Check the Actions logs for specific error messages
3. **Long build times**: EAS builds can take 10-20 minutes depending on queue

### Build Status:
You can check build status at:
- GitHub Actions tab in your repository
- [expo.dev/accounts/[username]/projects/[project-name]/builds](https://expo.dev)

## Local Testing
To test the build configuration locally:
```bash
eas build --platform android --profile preview --local
```

This will build the APK on your local machine (requires Android SDK).
