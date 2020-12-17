#!/usr/bin/env python3
import os
import logging

from pineapple.modules import Module, Request

module = Module('test', logging.DEBUG)

def cmd(command: str) -> str:
	return os.popen(command).read()

@module.handles_action('gateway_info')
def gateway_info(request: Request):
	rxb = os.popen("/usr/sbin/iw dev " + request.interface + " link | /bin/grep 'RX'").read() #get client link status (default wlan2)
	txb = os.popen("/usr/sbin/iw dev " + request.interface + " link | /bin/grep 'TX'").read() #get client link status (default wlan2)
	return {'rx':rxb, 'tx':txb}

@module.handles_action('usb_mount')
def usb_mount(request: Request):
	mount_location = "/usb"
	is_mounted = os.popen("mount | grep '" + mount_location + "'").read()
	return {'location':mount_location, 'info':is_mounted}

@module.handles_action('tx_power')
def tx_power(request: Request):
	command = "iw dev " + request.interface + " info | grep 'txpower'"
	txpower = cmd(command)
	return txpower

if __name__ == '__main__':
	module.start()
	#datausage = gateway_info()
	#print(datausage)
	#print(datausage['rx'], datausage['tx'])
