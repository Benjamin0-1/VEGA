import { combineReducers } from "redux";
import templatesReducer from "./templatesReducer";
import userReducer from "./userReducer";
import reviewsReducer from "./reviewsReducer";
import cartReducer from "./cartReducer";
import adminTemplatesReducer from "./adminTemplatesReducer"

const rootReducer = combineReducers({
  user:userReducer,
  templates: templatesReducer,
  reviews: reviewsReducer,
  cart: cartReducer,
  adminTemplates: adminTemplatesReducer
});

export default rootReducer;