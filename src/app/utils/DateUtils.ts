import {DateTime} from "luxon";

export function formatDate(dateTimeMillis: number) {
    // 받은 dateTimeMillis DateTime 객체로 변환
    const dateTime = DateTime.fromMillis(dateTimeMillis);

    // Luxon의 toFormat() 메서드를 사용하여 년-월-일 시:분 형식으로 변환
    const formattedDate = dateTime.toFormat('yyyy-MM-dd HH:mm');

    // 변환된 문자열 반환
    return formattedDate;
}
