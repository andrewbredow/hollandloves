# HollandLoves

The repository for the [HollandLoves](https://hollandloves.org) website

## Development

## Deployment

1. Complete above installation, and additionally install `certbot-s3front` by
   running `pip install certbot-s3front`

2. Install dialog: `brew install dialog`

3. Ensure that you have the following environment variables set:

```
AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY_ID
CF_DISTRIBUTION_ID
S3_BUCKET
```

4. Run `rake deploy`
