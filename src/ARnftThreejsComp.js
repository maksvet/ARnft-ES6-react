import React from 'react'
import { ARnft } from '@webarkit/ar-nft';
import ARnftThreejs from '@webarkit/arnft-threejs';
import * as THREE from 'three'

export default class ARnftThreejsComp extends React.Component {

    componentDidMount() {
      ARnft.init(640, 480, "DataNFT/pinball", 'config.json', true)
        .then((nft) => {
          let mat = new THREE.MeshLambertMaterial({color: 0xff0000});
          let boxGeom = new THREE.BoxGeometry(1,1,1);
          let cube = new THREE.Mesh( boxGeom, mat);
          cube.position.z = 90;
          cube.scale.set(180,180,180);

          let root = new THREE.Object3D();
          root.matrixAutoUpdate = false;
          document.addEventListener('containerEvent', function(ev) {

          let canvas = document.getElementById('canvas');
          let fov = 0.8 * 180 / Math.PI;
          let ratio = window.clientWidth / window.clientHeight;
          let config = {
            "renderer": {
              "alpha": true,
              "antialias": true,
              "context": null,
              "precision": "mediump",
              "premultipliedAlpha": true,
              "stencil": true,
              "depth": true,
              "logarithmicDepthBuffer": true,
              "objVisibility": false
            },
            "camera": {
              "fov": fov,
              "ratio": ratio,
              "near": 0.01,
              "far": 1000
            }
          }

          let sceneThreejs = new ARnftThreejs.SceneRendererTJS(config, canvas, root, nft.uuid, true);
          sceneThreejs.initRenderer();

          let nftAddTJS = new ARnftThreejs.NFTaddTJS(root);
          nftAddTJS.add(cube);

          const tick = () => {
            sceneThreejs.draw();
            requestAnimationFrame(tick)
          }
          tick()

          })

        }).catch((error) => {
          console.log(error);
        });

    }

    render() {
        return (
        <div
            style={{ width: "800px", height: "800px" }}
            ref={mount => { this.mount = mount}}
        />
        )
    }

}
