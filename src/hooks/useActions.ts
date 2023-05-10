import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import actionsCreators from "../store/actions";
import { AppDispatch } from "../store";

export const UseActions = () => {
  const dispatch = useDispatch<AppDispatch>();
  return bindActionCreators(actionsCreators, dispatch);
};
