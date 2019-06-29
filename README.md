# ProjeX

Source code for ProjeX Task Manager.

## SETTING UP 

- Install the following dependencies: 
    - [JAVA 8](https://tecadmin.net/install-oracle-java-8-ubuntu-via-ppa/)
    - [NodeJS 8](https://nodesource.com/blog/installing-node-js-8-tutorial-linux-via-package-manager/)
    - [Android SDK](https://developer.android.com/studio/#downloads)
    - [Genymotion](https://www.genymotion.com/fun-zone/)
    - [Yarn](https://yarnpkg.com/lang/en/docs/install) 
- Clone this repository
- Execute `yarn` in a terminal
- Create a file named 'config.js' in the project's root directory. This file allows us to avoid hard-coding development-only variables. Make sure it has the following structure: 
```javascript
    // Use the ip associated with your simulator's 
    // virtual machine (execute ifconfig in a terminal and copy
    // the result for vboxnetN (N is an integer)
    export const BASE_URL='http://192.168.58.1:3000'; 
    export const DEFAULT_EMAIL='test@test.com';
    export const DEFAULT_PASSWORD='12345678';
```

### INSTALLING JAVA 8
Follow [these steps](https://tecadmin.net/install-oracle-java-8-ubuntu-via-ppa/).
Export `JAVA_PATH` and `JAVA_HOME` environment variables in your `./.profile` file by appending these lines: 
```bash
export JAVA_PATH=/usr/lib/jvm/java-8-oracle/bin/java
export JAVA_HOME=/usr/lib/jvm/java-8-oracle 
```

### INSTALLING NODE JS 8
In order to execute Javascript code outside web browsers, we need an execution environment such as [Node JS](https://nodesource.com/blog/installing-node-js-8-tutorial-linux-via-package-manager/). Follow the instructions in the [link](https://nodesource.com/blog/installing-node-js-8-tutorial-linux-via-package-manager/) to install its current LTS version, NodeJS 8.

### INSTALLING ANDROID SDK
We will use [Android's software development kit](https://developer.android.com/studio/#downloads) in order to build React Native code into a format compatible with Android devices. To install it, follow the following steps:

2. Download Android SDK from [here](https://developer.android.com/studio/#downloads)
3. Extract the compressed files into `~/androidSDK/`.
4. Create an empty file named `repositories.cfg` at `~/.android/`.
5. Accept licenses by running `~/androidSDK/tools/bin/sdkmanager "platforms;android-28"`.
6. Install your build and platforms tools: `~/androidSDK/tools/bin/sdkmanager "build-tools;28.0.2"`, `~/androidSDK/tools/bin/sdkmanager "platform-tools"` 
6. Define the SDK's location through environment variables by adding the following lines to your  `~./.profile` file:
```bash
export ANDROID_HOME=~/androidSDK/
export PATH="${ANDROID_HOME}tools:${PATH}"
export PATH="${ANDROID_HOME}platform-tools:${PATH}"
export ANDROID_SDK=~/androidSDK/
```

### INSTALLING ANDROID NDK
[Android NDK](http://dl.google.com/android/repository/android-ndk-r10e-linux-x86_64.zip). For the build process, we will also need Android NDK. 

1. Download it from [here](http://dl.google.com/android/repository/android-ndk-r10e-linux-x86_64.zip) 
2. Extract the compressed folder into  `~/androidSDK/`. 
3. Set the corresponding environment variables  by adding the following line to your `~./.profile` file:
```bash
export ANDROID_NDK=~/androidNDK/android-ndk-r10e
```

### INSTALLING GENYMOTION
[Genymotion](https://www.genymotion.com/fun-zone/) is an Android emulator.

1. Download it from [here](https://www.genymotion.com/fun-zone/)
2. Set up a virtual device, preferably a Nexus 5 with Android 5.0.0.
3. Go to `Menu > Settings > ADB`, choose 'Use custom Android SDK tools' and select your `~/androidSDK/` folder.

### INSTALLING YARN
Follow the instruction [here](https://yarnpkg.com/lang/en/docs/install)

### RUNNING THE PROJECT

- Run `yarn` command to install all JavaScript packages.
- Generate android folder using `react-native eject`
- Go to your React Native app folder and start metro bundler `react-native start`
- Start your virtual device in Genymotion
- Deploy your app to your virtual device `react-native run-android`
