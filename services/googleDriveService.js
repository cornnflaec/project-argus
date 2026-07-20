const { google } = require("googleapis");
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI;
const REFRESH_TOKEN = process.env.GOOGLE_REFRESH_TOKEN;

class GoogleDriveService {

    getDrive() {

        const oauth2Client = new google.auth.OAuth2(
            CLIENT_ID,
            CLIENT_SECRET,
            REDIRECT_URI
        );

        oauth2Client.setCredentials({

            refresh_token: REFRESH_TOKEN

        });

        return google.drive({

            version: "v3",

            auth: oauth2Client

        });

    }

    async findFolder(folderName) {

        const drive = this.getDrive();

        const res = await drive.files.list({

            q: `
                mimeType='application/vnd.google-apps.folder'
                and
                name='${folderName}'
                and
                trashed=false
            `,

            fields: "files(id,name)"

        });

        if (!res.data.files.length) {

            throw new Error(
                `Folder '${folderName}' not found.`
            );

        }

        return res.data.files[0].id;

    }

    async findTemplate(folderId, fileName) {

        const drive = this.getDrive();

        const res = await drive.files.list({

            q: `
                '${folderId}' in parents
                and
                name='${fileName}'
                and
                trashed=false
            `,

            fields: "files(id,name)"

        });

        if (!res.data.files.length) {

            throw new Error(
                `${fileName} not found.`
            );

        }

        return res.data.files[0].id;

    }

    async download(fileId) {

        const drive = this.getDrive();

        const res = await drive.files.get(

            {
                fileId,
                alt: "media"
            },

            {
                responseType: "arraybuffer"
            }

        );

        return Buffer.from(res.data);

    }

    async getTemplate(templateConfig) {

        const folderId =
            await this.findFolder(
                templateConfig.folder
            );

        const fileId =
            await this.findTemplate(
                folderId,
                templateConfig.fileName
            );

        return await this.download(fileId);

    }

}

module.exports = new GoogleDriveService();