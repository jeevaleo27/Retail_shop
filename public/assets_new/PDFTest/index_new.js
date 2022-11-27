/*
Copyright 2019 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it. If you have received this file from a source other than Adobe,
then your use, modification, or distribution of it requires the prior
written permission of Adobe.
*/

/* Pass the embed mode option here */
var viewerConfig = {
    embedMode: "IN_LINE",
    defaultViewMode: "CONTINUOUS"
};

/* Wait for Adobe Document Services PDF Embed API to be ready */
document.addEventListener("adobe_dc_view_sdk.ready", function () {
    /* Initialize the AdobeDC View object */
    var adobeDCView = new AdobeDC.View({
        /* Pass your registered client id */
        clientId: "f46b81d78d5d48ba91c267c63f3c2129",
        /* Pass the div id in which PDF should be rendered */
        divId: "adobe-dc-view",
    });

    /* Invoke the file preview API on Adobe DC View object */
    adobeDCView.previewFile({
        /* Pass information on how to access the file */
        content: {
            /* Location of file where it is hosted */
            location: {
                url: "https://www.stacxdev.com/uploads/OrderDocumentPath/UDOC22002637_h1DaQl_20220425114234.pdf",
                /*
                If the file URL requires some additional headers, then it can be passed as follows:-
                header: [
                    {
                        key: "<HEADER_KEY>",
                        value: "<HEADER_VALUE>",
                    }
                ]
                
                header: [
                    {
                        key: "access-control-allow-headers",
                        value: "access-control-allow-origin",
                    },
                    {
                        key: "access-control-allow-methods",
                        value: "OPTIONS, HEAD, DELETE, POST, GET",
                    },
                    {
                        key: "access-control-allow-headers",
                        value: "access-control-allow-origin",
                    },
                ]*/
            },
        },
        /* Pass meta data of file */
        metaData: {
            /* file name */
            fileName: "UDOC22002637_h1DaQl_20220425114234.pdf"
        }
    }, {
    defaultViewMode: "CONTINUOUS",showDownloadPDF: true, showPageControls: true, showLeftHandPanel: true},{enableLinearization: true,});
});
