# Primon Proto 
# Headless WebSocket, type-safe Whatsapp Bot
# 
# Primon, lisanced under GNU GENERAL PUBLIC LICENSE. May cause some warranity problems, within Priomon.
# Multi-Device Lightweight ES6 Module (can usable with mjs)
#
# Phaticusthiccy - 2022


pnpm add typescript -D
yarn tsc
tsc --generateTrace	
tsc --watch	./index.ts
tsc --init
function install()
{
if [[ process.env.node > 12 ]]
then
npm install typescript -g
else
yarn install typescript
fi
}
install()
yarn pbjs ./types.proto --es6 ./index_protocol.js ;
yarn pbts -i ./types.proto ./index_protocol.ts;