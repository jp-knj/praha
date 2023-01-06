# 安全なIAMの設計を理解する
[課題内容](https://airtable.com/appPxhCPFYGqqN9YU/tblVlFr2q4lIqDKYc/viwX8r6DpCRp80swL/recqdS756KZg7zGT7?blocks=hide)

## 課題１
### 以下の説明をして下さい
- IAMユーザ
  - AWS（Amazon Web Services）のIAM（Identity and Access Management）のサービスを利用して作成されたユーザのことです。IAMユーザはAWSリソースにアクセスするための認証情報を提供し、AWSユーザーやグループにあらかじめ定義された権限を持たせることができます。
- IAMグループ
  - 作成されたグループのことです。IAMグループは、IAMユーザーをまとめて管理するための仕組みであり、階層的な権限を付与したり、パスワードポリシーを定義したりすることができます。
- IAMポリシー
  - 作成されたポリシーのことです。IAMポリシーは、IAMユーザーやグループに割り当てられた権限を定義するための仕組みであり、AWSリソースに対するアクセス権を設定することができます。
- IAMロール
  - 作成されたロールのことです。IAMロールは、AWSリソースに対して安全にアクセスするために使用され、特定のIAMユーザーまたはサービスアカウントに付与された権限を担保することで安全なアクセスを可能にします。
- Permission boundary
  - 作成された権限の上限を定義する仕組みです。Permission boundaryはIAMユーザーやグループに付与された権限を限定し、権限を越えたアクセスを禁止することでセキュリティレベルを高めることができます。
- AWS管理ポリシー
  - アクセス許可管理のアクセスレベルアクセス許可を付与せずに、特定のアクセスレベルを AWS サービスに付与することができます。AWS 管理ポリシーでは、ポリシーを自身で記述する場合よりも簡単に、適切なアクセス許可がユーザー、グループ、ロールに割り当てられます。
- カスタマー管理ポリシー
  - AWS アカウントの複数のプリンシパルエンティティにポリシーをアタッチできます。ポリシーをプリンシパルエンティティにアタッチすると、ポリシーで定義されたアクセス権限がエンティティに付与されます。
[AWS Identity and Access Management](https://docs.aws.amazon.com/ja_jp/IAM/latest/UserGuide/access_policies_managed-vs-inline.html#aws-managed-policies)

## 課題２

## 課題３
