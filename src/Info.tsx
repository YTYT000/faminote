import { useState } from "react";

import InfoModalComponent from "./InfoModalComponent";
import * as images from "./images";

const Info = () => {
  // Infoモーダルの開閉
  const [infoModalIsOpen, setInfoModalIsOpen] = useState(false);

  //モーダルの内容の切り替え
  const [displaySection, setDisplaySection] = useState<
    "basicInfo" | "detailInfo" | "hospitalInfo" | "memoInfo"
  >("basicInfo");

  //画像
  const [infoImageSrc, setInfoImageSrc] = useState(images.img_ProfileImage);

  //名前
  const [infoName, setInfoName] = useState("コロマル");

  //種類
  const [infoBreed, setInfoBreed] = useState("サモエド");

  //誕生日
  const [infoBirthYear, setInfoBirthYear] = useState(2020);
  const [infoBirthMonth, setInfoBirthMonth] = useState(12);
  const [infoBirthDate, setInfoBirthDate] = useState(1);

  //性別
  const [infoGender, setInfoGender] = useState("男の子");

  //避妊去勢
  const [infoNeutering, setInfoNeutering] = useState("済み");

  //アレルギー
  const [infoAllergy, setInfoAllergy] = useState("なし");

  //既往歴
  const [infoMedicalHistory, setInfoMedicalHistory] = useState("なし");

  //マイクロチップ番号
  const [infoMicrochipNumber, setInfoMicrochipNumber] =
    useState("123456789012345");

  //病院名
  const [infoHospitalName, setInfoHospitalName] =
    useState("ワンニャン動物病院");

  //電話番号
  const [infoPhoneNumber, setInfoPhoneNumber] = useState("000-0000-0000");

  //担当の先生
  const [infoDoctorName, setInfoDoctorName] = useState("山田太郎");

  //病院メモ
  const [infoHospitalMemo, setInfoHospitalMemo] = useState(
    `月曜休診。
土日は混むので平日の午前中が一番スムーズに受診できる。
駐車場＝車５台分あり。`
  );

  //メモ
  const [infoMemo, setInfoMemo] = useState(
    `爪切りと耳掃除が苦手。
人間が大好き。顎の下を撫でられるとご機嫌になる。
好きなおやつは犬用ジャーキー全般。`
  );

  return (
    //登録情報ページ
    <div className="infoPage page SpContentsMargin SpContentsMargin--infoPage">
      <div className="infoPage__headingWrap page__headingWrap">
        <h2 className="infoPage__heading page__heading pcItem">登録情報</h2>
      </div>

      {/* Infoモーダル呼び出し */}
      {infoModalIsOpen && (
        <InfoModalComponent
          isOpen={infoModalIsOpen}
          onRequestClose={() => setInfoModalIsOpen(false)}
          setInfoImageSrc={setInfoImageSrc}
          displaySection={displaySection}
          setInfoName={setInfoName}
          infoName={infoName}
          setInfoBreed={setInfoBreed}
          infoBreed={infoBreed}
          setInfoBirthYear={setInfoBirthYear}
          infoBirthYear={infoBirthYear}
          setInfoBirthMonth={setInfoBirthMonth}
          infoBirthMonth={infoBirthMonth}
          setInfoBirthDate={setInfoBirthDate}
          infoBirthDate={infoBirthDate}
          setInfoGender={setInfoGender}
          infoGender={infoGender}
          setInfoNeutering={setInfoNeutering}
          infoNeutering={infoNeutering}
          setInfoAllergy={setInfoAllergy}
          infoAllergy={infoAllergy}
          setInfoMedicalHistory={setInfoMedicalHistory}
          infoMedicalHistory={infoMedicalHistory}
          setInfoMicrochipNumber={setInfoMicrochipNumber}
          infoMicrochipNumber={infoMicrochipNumber}
          setInfoHospitalName={setInfoHospitalName}
          infoHospitalName={infoHospitalName}
          setInfoPhoneNumber={setInfoPhoneNumber}
          infoPhoneNumber={infoPhoneNumber}
          setInfoDoctorName={setInfoDoctorName}
          infoDoctorName={infoDoctorName}
          setInfoHospitalMemo={setInfoHospitalMemo}
          infoHospitalMemo={infoHospitalMemo}
          setInfoMemo={setInfoMemo}
          infoMemo={infoMemo}
        />
      )}

      <ul className="infoPage__list infoPageList">
        {/* 基本情報 */}
        <li className="infoPageList__item">
          <div className="infoPage__subHeadingWrap">
            <h3 className="infoPage__subHeading page__subHeading page__subHeading--infoPage">
              基本情報
            </h3>
            <button
              onClick={() => {
                setDisplaySection("basicInfo");
                setInfoModalIsOpen(true);
              }}
              className="button infoPage__button button--white"
            >
              編集する
            </button>
          </div>
          <div className="infoPage__inner infoPageInner">
            <dl className="infoPageInner__item infoPageInner__item--image">
              <dt className="infoPageInner__heading">写真</dt>
              <dd className="infoPageInner__image">
                <img alt="" src={infoImageSrc} />
              </dd>
            </dl>
            <dl className="infoPageInner__item">
              <dt className="infoPageInner__heading">名前</dt>
              <dd className="infoPageInner__content">{infoName}</dd>
            </dl>
            <dl className="infoPageInner__item">
              <dt className="infoPageInner__heading">種類</dt>
              <dd className="infoPageInner__content">{infoBreed}</dd>
            </dl>
            <dl className="infoPageInner__item">
              <dt className="infoPageInner__heading">誕生日</dt>

              <dd className="infoPageInner__content">{`${infoBirthYear}年${infoBirthMonth}月${infoBirthDate}日`}</dd>
            </dl>
            <dl className="infoPageInner__item">
              <dt className="infoPageInner__heading">性別</dt>
              <dd className="infoPageInner__content">{infoGender}</dd>
            </dl>
          </div>
        </li>

        {/* 詳細情報 */}
        <li className="infoPageList__item">
          <div className="infoPage__subHeadingWrap">
            <h3 className="infoPage__subHeading page__subHeading page__subHeading--infoPage">
              詳細情報
            </h3>
            <button
              onClick={() => {
                setDisplaySection("detailInfo");
                setInfoModalIsOpen(true);
              }}
              className="button infoPage__button button--white"
            >
              編集する
            </button>
          </div>
          <div className="infoPage__inner infoPageInner">
            <dl className="infoPageInner__item">
              <dt className="infoPageInner__heading">避妊・去勢</dt>
              <dd className="infoPageInner__content">{infoNeutering}</dd>
            </dl>
            <dl className="infoPageInner__item">
              <dt className="infoPageInner__heading">アレルギー</dt>
              <dd className="infoPageInner__content">{infoAllergy}</dd>
            </dl>
            <dl className="infoPageInner__item">
              <dt className="infoPageInner__heading">既往歴</dt>
              <dd className="infoPageInner__content">{infoMedicalHistory}</dd>
            </dl>
            <dl className="infoPageInner__item">
              <dt className="infoPageInner__heading">マイクロチップ番号</dt>
              <dd className="infoPageInner__content">{infoMicrochipNumber}</dd>
            </dl>
          </div>
        </li>

        {/* 病院情報 */}
        <li className="infoPageList__item">
          <div className="infoPage__subHeadingWrap">
            <h3 className="infoPage__subHeading page__subHeading page__subHeading--infoPage">
              病院情報
            </h3>
            <button
              onClick={() => {
                setDisplaySection("hospitalInfo");
                setInfoModalIsOpen(true);
              }}
              className="button infoPage__button button--white"
            >
              編集する
            </button>
          </div>
          <div className="infoPage__inner infoPageInner">
            <dl className="infoPageInner__item">
              <dt className="infoPageInner__heading">病院名</dt>
              <dd className="infoPageInner__content">{infoHospitalName}</dd>
            </dl>
            <dl className="infoPageInner__item">
              <dt className="infoPageInner__heading">電話番号</dt>
              <dd className="infoPageInner__content">{infoPhoneNumber}</dd>
            </dl>
            <dl className="infoPageInner__item">
              <dt className="infoPageInner__heading">担当の先生</dt>
              <dd className="infoPageInner__content">{infoDoctorName}先生</dd>
            </dl>
            <dl className="infoPageInner__item">
              <dt className="infoPageInner__heading">病院メモ</dt>
              <dd className="infoPageInner__content">
                {infoHospitalMemo.split("\n").map((line, i, arr) => (
                  <span key={i}>
                    {line}
                    {i < arr.length - 1 && <br />}
                  </span>
                ))}
              </dd>
            </dl>
          </div>
        </li>

        {/* メモ */}
        <li className="infoPageList__item">
          <div className="infoPage__subHeadingWrap">
            <h3 className="infoPage__subHeading page__subHeading page__subHeading--infoPage">
              メモ
            </h3>
            <button
              onClick={() => {
                setDisplaySection("memoInfo");
                setInfoModalIsOpen(true);
              }}
              className="button infoPage__button button--white"
            >
              編集する
            </button>
          </div>
          <ul className="infoPage__inner infoPageInner infoPageInner--memo">
            <li className="infoPageInner__item infoPageInner__item--memo">
              <p className="infoPageInner__memo">
                {infoMemo.split("\n").map((line, i, arr) => (
                  <span key={i}>
                    {line}
                    {i < arr.length - 1 && <br />}
                  </span>
                ))}
              </p>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default Info;
