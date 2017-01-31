import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {WcRSAService} from './webcrypto.rsa-oaep.service';
import {WcAESService} from './webcrypto.aes-cbc.service';

@NgModule({
    imports: [CommonModule],
    providers: [WcRSAService, WcAESService],
})
export class Ng2WebCryptoModule {}