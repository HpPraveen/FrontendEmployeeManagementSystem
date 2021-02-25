import { __decorate } from "tslib";
import { Component } from '@angular/core';
let LoginComponent = class LoginComponent {
    constructor(router, toastr) {
        this.router = router;
        this.toastr = toastr;
        this.username = 'admin';
        this.password = 'admin';
    }
    ngOnInit() {
    }
    loginClick() {
        if (this.username === 'admin' && this.password === 'admin') {
            this.router.navigate(['/employee']);
            this.toastr.success('Successfully logged-in');
        }
        else {
            this.toastr.error('Check Your login credentail !');
        }
    }
};
LoginComponent = __decorate([
    Component({
        selector: 'app-login',
        templateUrl: './login.component.html',
        styleUrls: ['./login.component.scss']
    })
], LoginComponent);
export { LoginComponent };
//# sourceMappingURL=login.component.js.map