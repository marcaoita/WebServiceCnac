// noinspection ES6ConvertVarToLetConst,JSUnusedGlobalSymbols

var dataPicker;
var dataPickerExec;

function selectpickerDtInicio() {

    dataPicker = new Litepicker({
        element: document.getElementById('dtsIni'),
        singleMode: false,
        autoApply: false,
        numberOfMonths: 2,
        format: 'DD-MM-YYYY',
        lang: 'pt-br',
        position: 'auto',
        setup: (picker) => {
            picker.on('hide', () => {
                onChangeIntervalo();
            });
        },
    });
}

function selectpickerExecucao() {

    dataPickerExec = new Litepicker({
        element: document.getElementById('dtsExec'),
        singleMode: false,
        numberOfMonths: 2,
        format: 'DD-MM-YYYY',
        lockDaysFormat: 'DD-MM-YYYY',
        lang: 'pt-br',
        position: 'auto',
        resetButton: true
    })


}

document.getElementById("limpaDatas").addEventListener("click", function (event) {
    dataPickerExec.clearSelection();
    event.preventDefault()
});


