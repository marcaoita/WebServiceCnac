// noinspection ES6ConvertVarToLetConst

var dataPicker;
var dataPickerExec;

/**
 * Função responsável por instanciar o plugin no HTML
 * @param {String} dtInicial Data inicial.
 * */
function selectpickerDtInicio(dtInicial) {

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

    if (dtInicial !== null) {
        dataPicker.setDateRange(dtInicial, dtInicial);
    }

}

/**
 * Função responsável por instanciar o plugin no HTML, por default ele é instanciado vazio.
 * */
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

