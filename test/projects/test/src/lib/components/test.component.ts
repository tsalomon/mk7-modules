import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
    selector: 'lib-test',
    templateUrl: './test.component.html',
    styleUrls: ['./test.component.css']
})
export class testComponent implements OnInit {
    constructor(private API: ApiService) { }


    gateway_radio = {'interface':'wlan2', 'txpower':'0.00 [dBm]', 'bitrate':'0.00 [Mbps]'}
    gateway_ap = {'essid':'TestNet', 'mac':'00:01:02:03:04:05', 'ip':'192.168.1.100', 'gw':'192.168.1.1/24', 'dns':'192.168.1.1'}
    gateway_data = {'rate':'0.00 [Mbps]', 'rx':'0 [bytes]', 'tx':'0 [bytes]'}    

    apiversion = "";
    mountinfo = {'location':'null', 'info':'none yet'};
    
    doAPIAction(): void {

	this.API.APIGet('/api/status', (response) => {
	    this.apiversion = response.versionString;
	});

	this.API.request({
	    module: 'test',
	    action: 'gateway_info',
	    interface: 'wlan2',
	}, (response) => {
	    this.gateway_data.rx = response.rx;
	    this.gateway_data.tx = response.tx;
	    console.log(response);
	});
    }

    getUsbMountInfo(): void {
	this.API.request({
		module: 'test',
		action: 'usb_mount',
	}, (response) => {
		this.mountinfo = response;
		console.log(response);
	});

    }

    getTxPower(): void {
	this.API.request({
		module: 'test',
		action: 'tx_power',
		interface: 'wlan2',
	}, (response) => {
		this.gateway_radio.txpower = response;
	});
    }
	
    ngOnInit(): void {
    }
}
