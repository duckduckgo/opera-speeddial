EXTNAME := chrome-zeroclick
KEYFILE := $(EXTNAME).pem
SHELL   := /usr/bin/env bash
CHROME  := chromium -n --args
CWD     := $(shell pwd)
TMPDIR  := $(shell mktemp -d)
VERSION := $(shell python2 -c "import json,sys;print json.loads(sys.stdin.read()).get('version','')" < manifest.json)
ITEMS   := css/ html/ img/ js/ manifest.json

all: pack

movebuild: $(ITEMS)
	rm -rf ../build/$(EXTNAME)
	mkdir ../build/$(EXTNAME)
	cp -R $(ITEMS) ../build/$(EXTNAME)

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
