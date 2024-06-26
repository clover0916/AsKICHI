# AsKICHI

[Linux 初心者向け](https://github.com/clover0916/AsKICHI/blob/main/README_FOR_BEGINNERS.md)👈

## 概要

AsKICHI は、混雑状況を表示するソフトウェアです。このプロジェクトは、多摩未来祭の混雑度をリアルアイムで把握し、管理するために開発されました。

## 特徴

- **リアルタイム混雑状況表示**: 特定の場所の混雑度をリアルタイムで表示します。
- **管理機能**: 混雑状況を管理するための機能を提供します。

## 技術スタック

- **フロントエンド/バックエンド**: Next.js
- **データベース**: PostgreSQL

# インストール

## 手順

1. このリポジトリをクローン(または ZIP でダウンロード)します。
2. クローンしたフォルダに移動します。
3. 端末(コマンドプロンプト)を開き、以下のコマンドを実行して依存関係をインストールします。

```bash
npm install
```

4. PostgreSQL を起動するため、次のコマンドを実行します。

```bash
docker-compose up -d
```

## 使用方法

1. 端末(コマンドプロンプト)で、以下のコマンドを実行して開発サーバーを起動します。

```bash
npm build && npm start
```

2. ブラウザで http://localhost:3000 にアクセスすると AsKICHI が表示されます。

## 貢献者

- clover0916 (プロジェクトオーナー)
- Sabu006 (コントリビューター)
- Moleigh-Lv563 (コントリビューター)

## ライセンス

このプロジェクトは MIT ライセンスのもとで公開されています。詳細は LICENSE ファイルをご覧ください。
