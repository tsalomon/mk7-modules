#!/usr/bin/env python3
import os
import logging

from pineapple.modules import Module, Request

module = Module('test', logging.DEBUG)

@module.handles_action('gateway_info')
def gateway_info(request: Request):
	rxb = os.popen("/usr/sbin/iw dev wlan2 link | /bin/grep 'RX'").read() #get client link status (default wlan2)
	txb = os.popen("/usr/sbin/iw dev wlan2 link | /bin/grep 'TX'").read() #get client link status (default wlan2)
	return {'rx':rxb, 'tx':txb}

if __name__ == '__main__':
	module.start()
	#datausage = gateway_info()
	#print(datausage)
	#print(datausage['rx'], datausage['tx'])
