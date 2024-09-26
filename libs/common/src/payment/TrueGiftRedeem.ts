import axios, { AxiosRequestConfig } from 'axios';
const tls = require("tls");

class TrueGiftRedeem {
    private apiTWGift: string = "https://gift.truemoney.com/campaign/";
    public proxy: any = null;
    constructor(){
        tls.DEFAULT_MIN_VERSION = "TLSv1.3";
    }
    async checkVouchers(vouchersHash: string): Promise<any> {
        const url: string = `${this.apiTWGift}vouchers/${vouchersHash}/verify`;

        const config: AxiosRequestConfig = {
            method: 'GET',
            url: url,
            headers: {
                'User-Agent': "Mozilla/5.0 (Windows NT 6.2; WOW64; rv:17.0) Gecko/20100101 Firefox/17.0"
            }
        };

        try {
            const response = await axios(config);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async redeem(mobileNumber: string, vouchersHash: string): Promise<any> {
        const url: string = `${this.apiTWGift}vouchers/${vouchersHash}/redeem`;
        
        const data = {
            mobile: mobileNumber,
            voucher_hash: vouchersHash
        };

        const config: AxiosRequestConfig = {
            method: 'POST',
            url: url,
            headers: {
                'Referer': `${this.apiTWGift}?v=${vouchersHash}`,
                'Content-Type': 'application/json',
                'User-Agent': "Mozilla/5.0 (Windows NT 6.2; WOW64; rv:17.0) Gecko/20100101 Firefox/17.0"
            },
            data: data
        };

        try {
            const response = await axios(config);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}

export default TrueGiftRedeem;
