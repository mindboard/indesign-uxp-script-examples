
idjs:=read-text-ts.idjs

$(idjs): main.ts
	deno bundle $< > $@

clean:
	rm -f $(idjs)
