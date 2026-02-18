# App Registry Documentation

## Overview

The App Registry is a centralized system for managing all applications, profiles, and their startup behavior in web98. It replaces the hardcoded initialization logic with a data-driven approach.

## App Registry Structure

The `APP_REGISTRY` object contains three main sections:

### 1. Profiles

Profile applications that contain project lists and metadata:

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

Utility applications like Random Windows, Custom Window:

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

### 3. Apps

Direct application launchers (for ?app parameter):

```javascript
APP_REGISTRY.apps = {
    appId: {
        id: 'appId',
        name: 'Display Name',
        handler: handlerFunction
    }
}
```

## Startup Configuration

### Default Configuration

```javascript
DEFAULT_STARTUP_CONFIG = {
    profiles: {
        enabled: true,
        count: 10,                              // Number of windows per profile
        delay: 100,                             // Delay between windows (ms)
        cascade: true,                          // Use cascade layout
        sequence: ['zigzag1001', 'weekoldroadkill']  // Profile order
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
- `?no` - Disable profile windows
- `?app=appId` - Launch a specific app (e.g., `?app=pixelwind`)

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
Spawns 10 windows of zigzag1001 and weekoldroadkill in cascade mode, with random windows utility.

**Custom profile count:**
```
http://localhost/index.html?profileCount=5
```
Spawns 5 windows of each profile.

**Single profile:**
```
http://localhost/index.html?profiles=zigzag1001&profileCount=3
```
Spawns 3 zigzag1001 windows only.

**Multiple profiles with custom count:**
```
http://localhost/index.html?profiles=weekoldroadkill,zigzag1001&profileCount=2
```
Spawns 2 windows of each profile in sequence.

**No profiles, only utilities:**
```
http://localhost/index.html?no
```
Shows only utility apps and static windows.

**Launch specific app:**
```
http://localhost/index.html?app=pixelwind
```
Launches pixelwind app maximized.

**Complete customization:**
```
http://localhost/index.html?profiles=zigzag1001&profileCount=5&profileDelay=200&noUtilities
```
Spawns 5 zigzag1001 windows with 200ms delay, no utilities.

## Adding New Content

### Adding a New Profile

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
function newProfileFunction(halfpage = true, side = 'left') {
    const profile = APP_REGISTRY.profiles.newprofile;
    createProfileFromJson({
        ...profile.profileData,
        rows: profile.projects
    }, halfpage, side);
}
```

3. Add to default startup sequence if desired:

```javascript
DEFAULT_STARTUP_CONFIG.profiles.sequence = ['zigzag1001', 'weekoldroadkill', 'newprofile'];
```

### Adding a New Utility

1. Add to `APP_REGISTRY.utilities`:

```javascript
APP_REGISTRY.utilities.newtool = {
    id: 'newtool',
    name: 'New Tool',
    icon: 'tool-icon.png',
    handler: newToolFunction
};
```

2. Add to default utilities if desired:

```javascript
DEFAULT_STARTUP_CONFIG.utilities.apps = ['randomWindows', 'newtool'];
```

### Adding a New App

1. Add to `APP_REGISTRY.apps`:

```javascript
APP_REGISTRY.apps.newapp = {
    id: 'newapp',
    name: 'New App',
    handler: () => {
        addWindow(simpleIframe('https://app-url.com', {
            title: 'New App',
            max: true
        }));
    }
};
```

2. Use with `?app=newapp` parameter

## Benefits

1. **Centralized Management**: All apps and profiles in one place
2. **Data-Driven**: Easy to add/modify content without changing core logic
3. **Flexible Startup**: Configure startup behavior via URL parameters
4. **Backward Compatible**: Legacy parameters still work
5. **Extensible**: Easy to add new profiles, utilities, and apps
6. **Maintainable**: Separation of data and logic
