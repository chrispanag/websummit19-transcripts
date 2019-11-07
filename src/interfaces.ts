export interface IGroupData {
    status: string;
    group: {
        id: number;
        name: string;
        owner: any;
        messages: ISpeechData[]
    }
}

export interface ISpeechData {
    id: string;
    created_at: string;
    last_modified_at: string;
    group_id: number;
    poster: any;
    is_deleted: boolean;
    speech: {
        speech_id: string;
        id: number;
        start_time: number;
        end_time: number;
        modified_time: number;
        is_deleted: boolean;
        duration: number;
        title: string;
        summary: string;
        appid: string;
        total_words: number;
        confidence: string;
        process_finished: boolean;
        is_read: boolean;
        upload_finished: boolean;
        hasPhotos: number;
        download_url: string;
        transcript_updated_at: number;
        live_status: string;
        live_status_message: string;
        folder: any | null;
    };
    entire_speech: boolean;
    snippets: any[];
    note: any | null;
    permission: string;
    group: any | {};
}