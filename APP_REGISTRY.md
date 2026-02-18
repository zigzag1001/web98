# App Registry Documentation

## Overview

The App Registry is a centralized system for managing all applications, profiles, and their startup behavior in web98. It is now located in **script.js** as core functionality, while profile-specific data is populated from **hardcoded.js**.

## Architecture

### script.js (Core Framework)
- Defines APP_REGISTRY structure with profiles, utilities, and cascadeState
- Implements cascade tracking per profile for independent positioning
- Contains startup configuration functions (getStartupConfig, executeStartup)
- Provides framework functionality that any profile can use

### hardcoded.js (Profile Data)
- Populates APP_REGISTRY.profiles with weekoldroadkill and zigzag1001 data
- Contains project lists for each profile
- Adds utility applications to APP_REGISTRY.utilities
- Implements profile-specific handler functions

## App Registry Structure

The `APP_REGISTRY` object (in script.js) contains:

### 1. Profiles

```javascript
APP_REGISTRY.profiles = {
    profileId: {
        id: 'profileId',
        name: 'Display Name',
        icon: 'icon-file.png',
        handler: handlerFunction,
        projects: [ /* array of project objects */ ],
        profileData: { /* profile metadata */ }
    }
}
```

**Project Object Structure:**
```javascript
{
    buttonText: 'Project Name',
    sourceUrl: 'https://source-repo-url',
    siteUrl: 'https://live-site-url',
    icon: 'icon-file.png',
    width: 1044,  // optional
    height: 612   // optional
}
```

### 2. Utilities

```javascript
APP_REGISTRY.utilities = {
    utilityId: {
        id: 'utilityId',
        name: 'Display Name',
        icon: 'icon-file.png',
        handler: handlerFunction
    }
}
```

### 3. Cascade State

Each profile maintains independent cascade tracking:

```javascript
APP_REGISTRY.cascadeState = {
    profileId: {
        x: 0,        // Current cascade X position
        y: 0,        // Current cascade Y position
        stackLength: 0  // Number of windows in current stack
    }
}
```

## Startup Configuration

### Default Configuration (in script.js)

```javascript
DEFAULT_STARTUP_CONFIG = {
    profiles: {
        enabled: true,
        count: 10,                              // Number of windows per profile
        delay: 100,                             // Delay between windows (ms)
        cascade: true,                          // Use cascade layout
        sequence: []                            // Profile order (auto-populated)
    },
    utilities: {
        enabled: true,
        delay: 2000,                            // Delay before showing utilities
        apps: ['randomWindows']                 // Utilities to show
    },
    staticWindows: {
        enabled: true,
        windows: [ /* static window configs */ ]
    },
    directApp: null                             // Direct app to launch
}
```

## URL Parameters

### Legacy Parameters (Backward Compatible)

- `?z=N` - Spawn N zigzag1001 profile windows (no cascade)
- `?w=N` - Spawn N weekoldroadkill profile windows (no cascade)
- `?z=N&w=M` - **NEW: Can work together!** Spawn N zigzag + M weekoldroadkill
- `?no` - Disable profile windows
- `?app=appId` - Launch a specific app (searches project lists dynamically)

### New Standardized Parameters

- `?profileCount=N` - Set number of profile windows to spawn (default: 10)
- `?profileDelay=N` - Set delay between profile windows in ms (default: 100)
- `?profiles=id1,id2` - Specify which profiles to show (comma-separated)
- `?utilities=id1,id2` - Specify which utilities to show (comma-separated)
- `?noUtilities` - Disable utility applications
- `?noStatic` - Disable static windows

### Examples

**Default startup:**
```
http://localhost/index.html
```
Spawns 10 windows of each profile (zigzag1001 and weekoldroadkill) with cascade.

**Both z and w together (NEW!):**
```
http://localhost/index.html?z=2&w=3
```
Spawns 2 zigzag1001 windows and 3 weekoldroadkill windows.

**Single profile:**
```
http://localhost/index.html?profiles=zigzag1001&profileCount=3
```
Spawns 3 zigzag1001 windows only.

**Launch project directly:**
```
http://localhost/index.html?app=pixelwind&no
```
Launches "Pixel Wind" project maximized, no profile windows.

**No profiles, only utilities:**
```
http://localhost/index.html?no
```
Shows only utility apps and static windows.

## Adding New Content

### Adding a New Profile (in hardcoded.js)

1. Add profile data to `APP_REGISTRY.profiles`:

```javascript
APP_REGISTRY.profiles.newprofile = {
    id: 'newprofile',
    name: 'New Profile',
    icon: null,  // Will be set dynamically
    handler: newProfileFunction,
    projects: [
        {
            buttonText: 'Cool Project',
            sourceUrl: 'https://github.com/user/project',
            siteUrl: 'https://user.github.io/project/',
            icon: 'gears-0.png'
        }
    ],
    profileData: {
        title: 'New Profile',
        img: './img/profile.png',
        defaultIcon: 'gears-0.png',
        sourceLink: 'https://github.com/user',
        sourceText: 'GitHub'
    }
};
```

2. Create the handler function:

```javascript
function newProfileFunction(halfpage = true, side = 'left', profileId = 'newprofile') {
    const profile = APP_REGISTRY.profiles.newprofile;
    createProfileFromJson({
        ...profile.profileData,
        rows: profile.projects
    }, halfpage, side, profileId);
}
```

### Adding a New Project to Existing Profile

Simply add to the projects array in hardcoded.js:

```javascript
APP_REGISTRY.profiles.zigzag1001.projects.push({
    buttonText: 'New Project',
    sourceUrl: 'https://github.com/zigzag1001/newproject',
    siteUrl: 'https://weekoldroadkill.com/newproject/',
    icon: 'defragment-0.png'
});
```

The project is automatically:
- ✅ Available via desktop icon
- ✅ Shown in profile window
- ✅ Launchable via `?app=newproject`

### Adding a New Utility

1. Add to `APP_REGISTRY.utilities` in hardcoded.js:

```javascript
APP_REGISTRY.utilities.newtool = {
    id: 'newtool',
    name: 'New Tool',
    icon: 'tool-icon.png',
    handler: newToolFunction
};
```

2. Optionally add to default utilities in script.js:

```javascript
DEFAULT_STARTUP_CONFIG.utilities.apps = ['randomWindows', 'newtool'];
```

## Key Improvements

### 1. Better Separation of Concerns
- **script.js**: Framework and core functionality
- **hardcoded.js**: Profile data and project lists

### 2. Per-Profile Cascade Tracking
- Each profile maintains independent cascade position
- No interference between different profiles
- Cleaner window arrangement

### 3. Independent URL Parameters
- `?z` and `?w` can now work together
- More flexible startup configurations
- Backward compatible with old URLs

### 4. Dynamic App Discovery
- No need to register apps separately
- Projects automatically available via `?app` parameter
- Reduces duplication

## Benefits

1. **Centralized Management**: All apps and profiles in one registry
2. **Data-Driven**: Easy to add/modify content without changing core logic
3. **Flexible Startup**: Configure startup behavior via URL parameters
4. **Backward Compatible**: Legacy parameters still work
5. **Extensible**: Easy to add new profiles, utilities, and apps
6. **Maintainable**: Clear separation of framework vs data
7. **Independent Cascading**: Each profile tracks its own position
