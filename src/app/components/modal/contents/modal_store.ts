import LoginModal from "./login_modal";
import RegisterModal from "./register_modal";

export default class ModalStore {
    public modals:Object[] = [];
    constructor() {
        this.modals['login'] = new LoginModal();
        this.modals['register'] = new RegisterModal();
   }

}