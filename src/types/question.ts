export type ItemData = {
id: string;
title?: string | null;
description?: string | null;
};
export type IQuestinData = {
id?: string;
title?: string | null;
description?: string | null;
};

 export type QuestionEditProps = {
itemData: ItemData;
};
export interface IQuestionPayload {
    id : string,
    payload: IQuestinData

}
