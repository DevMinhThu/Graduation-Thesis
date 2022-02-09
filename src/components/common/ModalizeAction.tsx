import ModalizeManager from 'components/base/modal/ModalizeManager';
import React from 'react';
import { Keyboard } from 'react-native';
import FilterModal from './FilterModal';

const ModalizeAction = () => {
    const modalize = ModalizeManager();

    const popupFilterModal = () => {
        Keyboard.dismiss();
        modalize.show('popupFilterModal', <FilterModal closeModal={() => modalize.dismiss('popupFilterModal')} />, {
            adjustToContentHeight: true,
            disableScrollIfPossible: false,
        });
    };

    return {
        popupFilterModal,
    };
};

export default ModalizeAction;
