/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useCallback, useEffect, useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {
  Scene,
  Vector3,
  ArcRotateCamera,
  Camera,
  WebXRSessionManager,
  SceneLoader,
  TransformNode,
  DeviceSourceManager,
  DeviceType,
  PointerInput,
  WebXRTrackingState,
  IMouseEvent,
  MeshBuilder,
  HemisphericLight,
} from '@babylonjs/core';
import '@babylonjs/loaders';
import {
  EngineView,
  EngineViewCallbacks,
  useEngine,
} from '@babylonjs/react-native';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const engine = useEngine();
  const [toggleView, setToggleView] = useState(false);
  const [camera, setCamera] = useState<Camera>();
  const [rootNode, setRootNode] = useState<TransformNode>();
  const [scene, setScene] = useState<Scene>();
  // const [xrSession, setXrSession] = useState<WebXRSessionManager>();
  // const [scale, setScale] = useState<number>(defaultScale);
  const [snapshotData, setSnapshotData] = useState<string>();
  const [engineViewCallbacks, setEngineViewCallbacks] =
    useState<EngineViewCallbacks>();
  const [trackingState, setTrackingState] = useState<WebXRTrackingState>();

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    if (engine) {
      const scene = new Scene(engine);
      setScene(scene);
      scene.createDefaultCamera(true);
      (scene.activeCamera as ArcRotateCamera).beta -= Math.PI / 8;
      setCamera(scene.activeCamera!);
      scene.createDefaultLight(true);
      // const rootNode = new TransformNode('Root Container', scene);
      // setRootNode(rootNode);

      const light = new HemisphericLight('light', new Vector3(0, 1, 0), scene);

      const sphere = MeshBuilder.CreateSphere(
        'sphere',
        {diameter: 2, segments: 32},
        scene,
      );
      sphere.position.y = 1;

      const ground = MeshBuilder.CreateGround(
        'ground',
        {width: 6, height: 6},
        scene,
      );

      // const transformContainer = new TransformNode(
      //   'Transform Container',
      //   scene,
      // );
      // transformContainer.parent = rootNode;
      // transformContainer.scaling.scaleInPlace(0.2);
      // transformContainer.position.y -= 0.2;

      // scene.beforeRender = function () {
      //   transformContainer.rotate(
      //     Vector3.Up(),
      //     0.005 * scene.getAnimationRatio(),
      //   );
      // };
      // SceneLoader.ImportMeshAsync(
      //   '',
      //   'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/BoxAnimated/glTF-Binary/BoxAnimated.glb',
      // ).then(result => {
      //   const mesh = result.meshes[0];
      //   mesh.parent = transformContainer;
      // });
    }
  }, [engine]);

  const onInitialized = useCallback(
    async (engineViewCallbacks: EngineViewCallbacks) => {
      setEngineViewCallbacks(engineViewCallbacks);
    },
    [engine],
  );

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <EngineView
          camera={camera}
          displayFrameRate={true}
          onInitialized={onInitialized}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
export default App;
