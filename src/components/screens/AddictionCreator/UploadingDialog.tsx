import React, { FC } from 'react';
import { Dialog, DialogProps, Portal, ProgressBar } from 'react-native-paper';

import i18n from '@/i18n';

interface UploadingDialogProps extends Omit<DialogProps, 'children'> {
  progress?: number;
}

const UploadingDialog: FC<UploadingDialogProps> = ({
  progress,
  visible,
  ...props
}) => {
  return (
    <Portal>
      <Dialog
        dismissableBackButton={true}
        dismissable={false}
        visible={visible}
        {...props}
      >
        <Dialog.Title>
          {i18n.t(['screens', 'addictionCreator', 'uploading', 'title'])}
        </Dialog.Title>
        <Dialog.Content>
          <ProgressBar progress={progress} />
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
};

export { UploadingDialog };
