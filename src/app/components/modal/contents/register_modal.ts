export default class RegisterModal {
    public content:string = `<div class="column">
    <form name="register" class="form">
        <div class="field">
            <label class="label">Name</label>
            <div class="control has-icons-left has-icons-right">
                <input class="input is-info is-rounded" type="text" placeholder="This information is not required" name="name">
                <span class="icon is-small is-left">
                    <i class="fas fa-info"></i>
                </span>
            </div>
        </div>
        <div class="field">
            <label class="label">Surname</label>
            <div class="control has-icons-left has-icons-right">
                <input class="input is-info is-rounded" type="text" placeholder="This information is not required" name="surname">
                <span class="icon is-small is-left">
                    <i class="fas fa-info"></i>
                </span>
            </div>
        </div>
        
        <div class="field">
            <label class="label">Username</label>
            <div class="control has-icons-left has-icons-right">
                <input class="input is-primary is-rounded" type="text" placeholder="Enter username" name="username">
                <span class="icon is-small is-left">
                    <i class="fa fa-user"></i>
                </span>
            </div>
        </div>
        
        <div class="field">
            <label class="label">Email</label>
            <div class="control has-icons-left has-icons-right">
                <input class="input is-primary is-rounded" type="email" placeholder="Enter a valid email" name="email">
                <span class="icon is-small is-left">
                    <i class="fa fa-envelope"></i>
                </span>
            </div>
        </div>
        
        <div class="field">
            <label class="label">Date Of Birth</label>
            <div class="control">
                <input class="input is-primary is-rounded" type="date" name="dob">
            </div>
        </div>
        
        <div class="field">
            <label class="label">Password</label>
            <div class="control">
                <input class="input is-primary is-rounded" type="password" name="password">
            </div>
        </div>
        
        <div class="field">
            <label class="label">Password Confirm</label>
            <div class="control">
                <input class="input is-primary is-rounded" type="password" name="password_confirm">
            </div>
        </div>
        
        
        <div class="field">
            <label class="label">Description</label>
            <div class="control">
                <textarea class="textarea is-info" name="description" placeholder="Tell me a bit more about you"></textarea>
            </div>
        </div>
        
    </form>
            <div class="section">
                <div class="field is-grouped">
                    <div class="control">
                        <button class="button is-link send_form">Enlist</button>
                    </div>
                    <div class="control">
                        <button class="button is-danger modal_cross">Cancel</button>
                    </div>
                </div>
            </div>
</div>`;
    public get_content() {
        return this.content;
    }
}