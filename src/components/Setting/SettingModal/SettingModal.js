import React, {useState} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

function SettingModal({ 
    className, 
    onClose,
    maskClosable,
    closable,
    visible, 
    children 
}) {


    const onMaskClick = (e) => {
        if(e.target === e.currentTarget){
            onClose(e);
        }
    };


    const close = (e) => {
        if(onClose){
            onClose(e);
        }
    }

    return (
      <div>
        <ModalOverlay visible={visible} />
        <ModalWrapper 
            className={className} 
            tabIndex="-1" 
            visible={visible}
            onClick={maskClosable ? onMaskClick : null}
        >
          <ModalInner tabIndex="0" className="modal-inner">
          <div className="modal-container">
                <div className="modal">
                    <div>
                        <div className="select-container" >
                            <h2 className="select-title" >클라우드 계정 추가</h2>
                            <div className="select" >제공사</div>
                            <ul className="selected-list">
                                <li className="selected-cloudlist">Amazon Web Service</li>
                            </ul>
                            <input className="select-input" placeholder="Cloud ID"></input>
                            <button className="select-btn">중복 확인</button>

                            <div className="select-Supplier">
                                <input className="select-input" placeholder="Access Key"></input>
                                <input className="select-input" placeholder="Secret Key"></input>
                                <div className="select region">Region</div>
                                <ul className="selected-list">
                                    <li className="selected-cloudlist"> </li>
                                </ul>
                                <div className="select-bottom-text">
                                    <span>클라우드 키 발급 방법</span>
                                    <span onClick={close}>취소</span>
                                    <span>추가</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </ModalInner>
        </ModalWrapper>
      </div>
    )
  }
  
  SettingModal.propTypes = {
    visible: PropTypes.bool,
  }

  SettingModal.defaultProps = {
      closable : true,
      maskClosable : true,
      visible : false
  }
  
  const ModalWrapper = styled.div`
    box-sizing: border-box;
    display: ${(props) => (props.visible ? 'block' : 'none')};
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1000;
    overflow: auto;
    outline: 0;
  `;
  
  const ModalOverlay = styled.div`
    box-sizing: border-box;
    display: ${(props) => (props.visible ? 'block' : 'none')};
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: #202024c0;
    z-index: 999;
  `;
  
  const ModalInner = styled.div`
    box-sizing: border-box;
    position: relative;
    background-color: transparent;
    width: 360px;
    max-width: 480px;
    top: 50%;
    transform: translateY(-50%);
    margin: 0 auto;
    padding: 40px 20px;

  `;


export default SettingModal;