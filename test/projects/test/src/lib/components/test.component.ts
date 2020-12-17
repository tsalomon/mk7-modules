import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
    selector: 'lib-test',
    templateUrl: './test.component.html',
    styleUrls: ['./test.component.css']
})
export class testComponent implements OnInit {
    constructor(private API: ApiService) { }

    apiversion = "";
    datausage = {'rx':'0','tx':'0'};
    mountinfo = {'location':'null', 'info':'none yet'};
    txpower="0.00"
    stats = [
	{name: 'test1', value: '0.1'},
	{name: 'test1', value: '0.2'},
	{name: 'test1', value: '0.3'},
	{name: 'test1', value: '0.4'},
	{name: 'test1', value: '0.5'},
	{name: 'test1', value: '0.6'},
	{name: 'test1', value: '0.7'},
	{name: 'test1', value: '0.8'},
	{name: 'test1', value: '0.9'}, 
    ];

    doAPIAction(): void {

	this.API.APIGet('/api/status', (response) => {
	    this.apiversion = response.versionString;
	});

	this.API.request({
	    module: 'test',
	    action: 'gateway_info',
	    interface: 'wlan2',
	}, (response) => {
	    this.datausage = response;
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
		this.txpower = response;
	});
    }
	
    ngOnInit(): void {
    }
}
