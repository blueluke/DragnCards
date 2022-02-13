import { Checkbox } from "@material-ui/core";
import React, {useState} from "react";
import ReactModal from "react-modal";
import Button from "../../components/basic/Button";
import useProfile from "../../hooks/useProfile";
import { withStyles } from "@material-ui/core/styles";
import { TOOLTIPINFO } from "./Constants";
import axios from "axios";


const CustomColorCheckbox = withStyles({
  root: {
    color: "#ffffff",
    "&$checked": {
      color: "#ffffff"
    }
  },
  checked: {}
})((props) => <Checkbox color="default" {...props} />);


export const TooltipModal = React.memo(({
    tooltipId,
    tooltipIds,
    setTooltipIds,
    setShowModal,
    gameBroadcast,
}) => {
    const myUser = useProfile();
    //alert(myUser.hidden_tooltips)
    const handleHideClick = async () => {
      const hiddenTooltips = myUser.hidden_tooltips ? [...myUser.hidden_tooltips, tooltipId] : [tooltipId];
      const data = {
        user: {
          ...myUser,
          hidden_tooltips: hiddenTooltips
        }
      };
      const res = await axios.post("/be/api/v1/profile/update", data);
      removeTooltip();
    }


    const handleCloseClick = () => {
      removeTooltip();
    }

    const removeTooltip = () => {
      var index = tooltipIds.indexOf(tooltipId);
      if (index !== -1) {
        tooltipIds.splice(index, 1);
      }
      setTooltipIds([...tooltipIds])
    }

    if (myUser.hidden_tooltips && myUser.hidden_tooltips.includes(tooltipId)) {
      alert('removing '+ tooltipId)
      removeTooltip();
      return null;
    }

    return(
      <ReactModal
        closeTimeoutMS={200}
        isOpen={true}
        contentLabel="Spawn a card"
        overlayClassName="fixed inset-0 bg-black-50 z-10000"
        className="insert-auto overflow-auto p-5 bg-gray-700 border max-w-xs mx-auto my-12 rounded-lg outline-none max-h-3/4"
      >
        <div className="text-white mb-2">{TOOLTIPINFO[tooltipId]}</div>    
        <span>
          <Button onClick={handleHideClick} className="inline mt-2">
            Never show again
          </Button>
          <Button onClick={handleCloseClick} className="inline mt-2" isPrimary>
            Close
          </Button>
        </span>
      </ReactModal>
    )
})