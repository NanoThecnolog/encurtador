import { Global, Module } from "@nestjs/common";
import { AstraProvider } from "./astra.provider";

@Global()
@Module({
    providers: [AstraProvider],
    exports: [AstraProvider]
})
export class AstraModule { }