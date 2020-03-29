import React from 'react';
import { Modal, ModalProps, SIZE } from 'baseui/modal';

type Props = Omit<ModalProps, 'size' | 'overrides'>;

const FullscreenModal = (props: Props) => {
  return (
    <Modal
      size={SIZE.full}
      overrides={{
        Close: { style: { display: 'none' } },
        Root: { style: { margin: '0px' } },
        Dialog: {
          style: {
            marginLeft: '0px',
            marginRight: '0px',
            marginTop: '0px',
            marginBottom: '0px',
          },
        },
      }}
      {...props}
    />
  );
};

export default FullscreenModal;
