import boto3
import time

# Change these values, make them constant variables?
# EvaluationId
# MLModelId
# EvaluationDataSourceId

# s3 = boto3.resource('s3')
# s3.create_bucket(Bucket='dee-bucket-test', CreateBucketConfiguration={'LocationConstraint': 'us-west-1'})
# # bucket name has to be unique and all lowercase.
# s3.meta.client.upload_file('C:/Users/sothea/Documents/ASU EmergenTech Hackathon/Amazon AWS Cloud/banking.csv', 'dee-bucket-test', 'train1.csv')
# s3.meta.client.upload_file('C:/Users/sothea/Documents/ASU EmergenTech Hackathon/Amazon AWS Cloud/banking-batch.csv', 'dee-bucket-test', 'banking-batch.csv')
# s3.meta.client.upload_file('C:/Users/sothea/Documents/ASU EmergenTech Hackathon/Amazon AWS Cloud/banking-data.schema', 'dee-bucket-test', 'banking-data.schema')


client = boto3.client('machinelearning')
print("creating DataSource")

# change DataSourceID everytime you run this py script
response_data = client.create_data_source_from_s3(
    DataSourceId='train-data-source-3',
    #DataSourceName='string',
    DataSpec={
        'DataLocationS3': 's3://train1-bucket-2/train1.csv',
        #'DataRearrangement': 'string',
        #'DataSchema': 'banking-data.schema',
        'DataSchemaLocationS3': 's3://train1-bucket-2/train1-data.schema'
    },
    #ComputeStatistics=True|False
    ComputeStatistics=True

)

print(response_data)
print("Creating MLModel")
time.sleep(5)
#response = client.create_realtime_endpoint(

#    MLModelId='banking-data-source-id'
#)

# change MLModeId and TrainingDataSourceID everytime you run this py script
response_ml_model = client.create_ml_model(
    MLModelId='train-model-3',
    MLModelName='train1model',
    MLModelType='BINARY',
    TrainingDataSourceId='train-data-source-3'
)


# response = client.get_data_source(
#     DataSourceId='string',
#     #Verbose=True|False
# )

print(response_ml_model)
print("ML Model Creation")


# change EvaluationId everytime you run this py script
response_eval = client.create_evaluation(
   EvaluationId='ml-evaluation6',
    #EvaluationName='string',
   MLModelId='train-model-3',
   EvaluationDataSourceId='train-data-source-3'
)

print(response_eval)
print("ML Model Evaluation")

# # Creating a Real-time Prediction Request
# response = client.create_realtime_endpoint(
#     MLModelId='string'
# )

# # start predicting
# response_predict = client.predict(
#     MLModelId='unique-model-id-1',
#     Record={
#         'string': 'string'
#     },
#     PredictEndpoint="machinelearning.us-east-1.amazonaws.com"
# )

response_batch_predict = client.create_batch_prediction(
    BatchPredictionId='unique-model-id-7',
    #BatchPredictionName='string',
    MLModelId='train-model-3',
    BatchPredictionDataSourceId='train-data-source-3',
    OutputUri='s3://train1-bucket-2/'
)

print(response_batch_predict)
print("ML Model Batch Prediction")


# get the batch predictor
response_store_predict = client.get_batch_prediction(
    BatchPredictionId='unique-model-id-6'
)