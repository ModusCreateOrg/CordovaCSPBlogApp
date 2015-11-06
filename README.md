# Cordova Content Security Policy / iOS 9 ATS Demo App

## Introduction

This is a Cordova 5 app that demonstrates the steps needed to successfully make an Ajax request for data from a server, and how to configure the Content Security Policy meta tag to allow this.

For iOS 9 / Xcode 7 users this also demonstrates the configuration of App Transport Security (ATS) which by default will block non SSL requests to backend servers.

A blog post explaining these issues and how to address them can be found [on the Modus Create blog](http://moduscreate.com/cordova-5-ios-9-security-policy-changes/)

The app is very simple, it calls out to an exchange rate API (```http://api.fixer.io```) and aims to tell us the current value of the Euro in US Dollars.  It uses JQuery, but nothing about the Content Security Policy or ATS setup is framework specific - configurations apply to any JS framework.

## Environment Setup

**This project contains iOS specifics, so you will need to build it on a Macintosh.**

You will need the following installed to be able to use this app properly:

* Cordova CLI 5.3.3 or newer
* XCode 7 or newer (must be XCode 7 as 6.x doesn't build for iOS 9 and use ATS)
* Android SDK installed and SDK API level 22 (Android 5.1.1) or higher installed
* Internet connection
* Optional: Android emulator configured
* Optional: Android and iOS device(s)

To check you have Cordova CLI configured properly, open up a Terminal window on your Mac and type:

```
cordova -version
```

You should expect to see something like:

```
5.3.3
```

If your version doesn't begin with 5, or the cordova binary can't be found then update your Cordova version and Terminal path appropriately.

## Clone and Initial Build

Clone the GitHub repo to your Macintosh, then open up a Terminal and cd to wherever you cloned the repo.  To get the app running in the first of three demo states, enter these commands:

```
cd <folder where repo was cloned>
cd app
cordova platform add ios android
cordova build ios
cordova build android
```

You should now be able to run the app in the emulators or on your device in the normal way.

When first cloned, the app will be in the "Step 1" state (broken).

## App States

There are 3 states, or steps, to this app:

* **Step 1:** Initial out of the box app using default Content Security Policy and ATS configurations that the Cordova CLI uses when creating an app.  This will fail to get the remote data on iOS < 9, iOS 9 and Android because the Content Security Policy meta tag in index.html does not permit it
* **Step 2:** Here, the Content Security Policy meta tag in index.html has been modified to allow data connections to the API that we are using.  This will work on iOS < 9 and Android, but will continue to fail on iOS 9 because even though we have Cordova configured correctly now, iOS 9 is still blocking our http URL request because the default ATS configuration disallows all non-SSL backends
* **Step 3:** Here, we have modified the iOS app's .plist (using a Cordova build hook script) to configure an ATS exception allowing non-SSL connections to our API host.  This version of the app will now work on all iOS and Android versions

After cloning the repo and following the initial build instructions, you will be at step 1 with a pretty broken app for both Android and iOS.

## Transitioning Between States

When first cloned, the app is at step 1 (default Cordova configuration) and will fail to get the data from the API.

To transition it to step 2 (fixed Content Security Policy meta tag, works on iOS <9 and Android):

```
cd <folder where repo was cloned>/app
./step2.sh
cordova build ios
cordova build android
```

To then transition to step 3 (fixed Content Security Policy and patches iOS 9 ATS in the project's .plist file - works on all devices):

```
cd <folder where repo was cloned>/app
./step3.sh
cordova build ios
cordova build android

```

To go back to step 1 (not working on iOS <9, 9 or Android):

```
cd <folder where repo was cloned>/app
./step1.sh
cordova build ios
cordova build android
```
