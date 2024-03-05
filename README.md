# 概要
「FamiNote（ファミノート）」は、ペットという大切な家族の健康を管理するためのアプリです。
日々の記録を付けることで、  
- 介護  
- 通院  
- 治療  
- 自宅療養

ケアが必要な家族の生活をサポートします。


**▼URL**  
https://faminote-app.web.app/


![MV](./github_img/fv_wide.png)

# 使用技術
**▼フロントエンド**
- HTML
- CSS/Sass
- JavaScript
- React 18.2.0
- TypeScript 5.2.2


**▼インフラ**
- Firebase 10.8.1


**▼その他**
- Figma
- Adobe Photoshop
- Adobe Illustrator


# 機能一覧
### 日々の記録
- ごはん、お水、トイレなど、お世話内容を記録することができます。

![recordpage-01](./github_img/recordpage-01.png)
![recordpage-02](./github_img/recordpage-02.png)


- 記録した内容は、タイムラインにその日一日の出来事として記録されます。（画像の添付も可能です。）

![recordpage-03](./github_img/recordpage-03.png)

- 一日のまとめを記録することができます。
  - 体重（上書きして更新することが可能です。）
  - 一日を通しての体調（上書きして更新することが可能です。）
  - 一日の総食事量（自動計算されます。）
  - 一日の総水分摂取量（自動計算されます。）

![recordpage-04](./github_img/recordpage-04.png)


### 体重の推移グラフ
- 一か月ごと、あるいは一週間ごとの体重の推移をグラフで確認できます。
- 現在、グラフは自動生成されたランダムな値に基づいて描画されています。

![graphpage-01](./github_img/graphpage-01.png)
![graphpage-02](./github_img/graphpage-02.png)


### カレンダー
- 現在の月のカレンダーを表示します。
- 今日の日付はオレンジ色でハイライトされます。

![calendarpage-01](./github_img/calendarpage-01.png)

### 登録情報の記録
- 家族の情報を登録できます。
- 「編集する」ボタンから各項目の内容を編集できます。

![infopage-01](./github_img/infopage-01.png)
![infopage-02](./github_img/infopage-02.png)

### その他
- レスポンシブ対応済み

### 今後の実装予定
- 記録ページ内の各タイムラインの編集機能
- 記録ページで記録した体重を体重グラフページに連携
- 記録ページで記録があった日は、カレンダーページの該当日にマークを追加
