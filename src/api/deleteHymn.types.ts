interface DeleteHymnSuccess {
    success: true;
}

interface DeleteHymnFail {
    success: false;
    clientErrorMessage?: string;
    debug?: object;
}

export type DeleteHymnResponse = 
    | DeleteHymnSuccess | DeleteHymnFail;