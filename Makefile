EXTNAME := opera-speeddial
KEYFILE := $(EXTNAME).pem
SHELL   := /usr/bin/env bash
CHROME  := chromium -n --args
CWD     := $(shell pwd)
TMPDIR  := /tmp/$(EXTNAME)
VERSION := $(shell python2 -c "import json,sys;print json.loads(sys.stdin.read()).get('version','')" < manifest.json)
ITEMS   := oex_shim/ images/ js/ style.css index.html manifest.json

all: pack

movebuild: 
	rm -rf $(TMPDIR)
	mkdir $(TMPDIR)
	cp -R $(ITEMS) $(TMPDIR)

moveout: $(ITEMS)
	mkdir $(TMPDIR)/$(EXTNAME)
	cp -R $(ITEMS) $(TMPDIR)/$(EXTNAME)

crx: moveout
	$(CHROME) --pack-extension=$(TMPDIR)/$(EXTNAME) \
	    --pack-extension-key=$(KEYFILE) --no-message-box
	mv $(TMPDIR)/$(EXTNAME).crx $(CWD)/build/$(EXTNAME)-latest.crx

zip: moveout
	cd $(TMPDIR)/$(EXTNAME)/ && zip $(EXTNAME)-$(VERSION).zip -r ./*
	cp $(TMPDIR)/$(EXTNAME)/$(EXTNAME)-$(VERSION).zip $(CWD)

clean:
	rm $(CWD)/*.zip
