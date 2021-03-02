import { BeforeInsert, BeforeRemove, Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import aws from 'aws-sdk';
import fs from 'fs';
import { promisify } from "util";
import path from 'path';

const s3 = new aws.S3();

@Entity('posts')
class Post {
    @PrimaryColumn()
    readonly id: string;

    @Column()
    name: string;

    @Column()
    size: number;

    @Column()
    key: string;

    @Column()
    url: string;

    @CreateDateColumn()
    created_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }

    @BeforeInsert()
    async validate() {
        if (!this.url) {
            this.url = `${process.env.APP_URL}/files/${this.key}`;
        }
    };

    @BeforeRemove()
    async validateDelete() {
        if (process.env.STORAGE_TYPE === 's3') {
            return s3
                .deleteObject({
                    Bucket: 'happyupload',
                    Key: this.key,
                })
                .promise();
        } else {
            return promisify(fs.unlink)(
                path.resolve(__dirname, '..', '..', 'tmp', 'uploads', this.key)
            );
        }
    }
}

export default Post;