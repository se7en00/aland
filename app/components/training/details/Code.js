import qr from 'qr-image';
import svgpath from 'svgpath';
import React, { Component } from 'react';
class Code extends React.Component {
    constructor(props) {
      super(props);
      
    }

    render() {
    const {extend} =this.props;
    const _path = `type=qr_training_lesson,trainingId=${extend.trainingId},lessionId=${extend.id}`;
    console.log(_path)
    const originPath = qr.svgObject(_path).path
    const scaledPath = svgpath(originPath).scale(3, 3).toString();
      return (
        <div>
        
          <svg width="100%" height="300" ref={(ref)=>this._qrcodeSVG = ref} transform="scale(2) translate(75 75)">
            <path d={scaledPath?scaledPath:null}/>
          </svg>
        </div>
      );
    }
  }
  
  export default Code;