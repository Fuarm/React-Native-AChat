## AChat App

### Android 环境配置bug
1、使用 `npx react-native init [name]` 命令生成项目

2、使用 `yarn android` 命令java编译依赖包(**bug严重发生区**)

3、bug解决方式步骤

3.1 在**环境变量**中设置变量 `ANDROID_HOME`(Android SDK地址: 到 Sdk 目录即可)、`JAVA_HOME`(Java JDK 地址：到 jdk-xx.xx.xx 即可);

3.2 修改 android/gradle/wrapper/gradle-wrapper.properties 文件 中 gradle 的 版本号 (一般更新到最新的版本, 可以查看 rn版本对应的 gradle 版本)
```
distributionUrl=https\://services.gradle.org/distributions/gradle-7.3-all.zip
```
3.3 本人使用 Android Studio 自带的模拟器出现使用命令打开模拟器 安装 installDEBUG 失败

解决方案：手动打开模拟器，执行命令`yarn android`

### ios 环境配置bug
pod 命令安装依赖失败

可以在 `/etc/hosts` 文件中配置 可以 ping 通的 ip 即可下载安装

M1 芯片 导致的bug

参考方案: arm64（链接暂未找到）

### 1、登陆/注册实现 （基于 voximplant）：注册
1、KeyboardAvoidingView 弹出输入键盘，没有调整自身的 height 或底部的 padding 安卓模拟器中（未使用安卓真机测试）

解决方案： 用 ScrollView 组件包裹

### 2、组件：轮播、按钮（可渐变）

### 3、TabBar 组件
1、使用 react-navigation 中提供的导航组件
2、使用 react-native-blur Android 中 出现的编译bug

`Could not find com.eightbitlab：blurview：1.6.3.#446`

解决方案：https://github.com/Kureev/react-native-blur/issues/446

### 4、react-navgiation 导航
1、依赖插件
```
@react-navigation/native
@react-navigation/stack
react-native-gesture-handler（关联插件）
react-native-safe-area-context（关联插件）
```
2、依赖安装完毕后，需重新执行`yarn android`编译

### 5、HeadNav 组件

### 6、fetch 封装

### 7、ContactScreen

### 8、CallingScreen

### 9、IncomingScreen

### 10、voximplant 实时视频通话接入

### 11、推送通知