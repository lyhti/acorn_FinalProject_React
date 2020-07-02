import React, {useState} from 'react';
import OptionChangeDetail from './Option_Change_Detail'
import Button from '@material-ui/core/Button';




const Option_Change = () => {

    const [showModal, setShowModal] = useState(false);

    const toggleModal = () =>{
        setShowModal(!showModal);
    }
    const closeModal = e => {
        if(e.target.id ==="modal"){
            toggleModal();
        }
    }

    return (
   <>
   {showModal && (
        <OptionChangeDetail

        toggleModal={toggleModal}
        closeModal={closeModal}
      />
        )} 

   <div><Button variant="outlined" className = "btn_option_change"
        onClick={()=> setShowModal(true)}>
        옵션/수량변경
    </Button></div>
    
   </>
  );
}

export default Option_Change;