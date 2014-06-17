Ember4.QRCodePreviewView = Ember.View.extend({
    didInsertElement: function() {
        console.log("generating qrcode..");
        
        //console.log(this.get('controller').get('model').qrcode);

        var qrcode = new QRCode(document.getElementById('qrcode-render-target'), {
            text: "qrcode-render-target",
            width: 250,
            height: 250,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.L
        });
    },
    
    redrawQRCode: function() {

        qrcode = this.get('controller').get('qrcode');
        
        $rt = $('#qrcode-render-target');
        $rt.empty();
        
        var qrcode = new QRCode($rt[0], {
            text: qrcode,
            width: 250,
            height: 250,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.L
        });
    },
    
    qrcodeDataChanged: function() {
        console.log("qrcode data changed");
        this.redrawQRCode();
        
    }.observes('controller.qrcode_data')
});
