/**
 *@NApiVersion 2.1
 *@NScriptType ScheduledScript
 */

define(["N/search", "N/record"], (search, record) => {
    const execute = (context) => {
        log.debug("INICIANDO EJECUCIÓN  DE SS", "STARTED");

        const invoicesSearchObj = search.load({
            id: "customsearch_ent_train_facturas_ss",
        });

        let counter = 0;
        invoicesSearchObj.run().each((result) => {
            log.debug("RESULT", result);

            /* 10 Unidades */
            const currentInvoiceRecord = record.load({
                type: result.recordType,
                id: result.id,
            });

            currentInvoiceRecord.setValue({
                fieldId: "memo",
                value: "TESTING: " + counter,
            });

            currentInvoiceRecord.save({
                ignoreMandatoryFields: true,
            });

            counter++;
            return true;
        });
    };

    return {
        execute,
    };
});

/* SUITELET: 1000 unidades */
/* SCHEDULED: 10000 unidades */
