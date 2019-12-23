# Script to Increment a TAG release number in a repo on every CI deployment
# Meant to be used in a bitbucket-pipelines.yml run


USERNAME="stevemassco"
PASSWORD='0Hde3BXHlm1z'
PASSWORD="Welcometoatlassian!1"
REPO="prompted/new_prompt_metronic"

git init
git config user.name "$USERNAME"
git config user.email "steveolson@maasco.com"
### #git config remote.origin.url "https://$USERNAME:$PASSWORD@bitbucket.org/$REPO.git"
### # CI - error already exists - commenting out - git remote add origin "https://$USERNAME:$PASSWORD@bitbucket.org/$REPO.git"
git pull
### # git checkout production

# BRANCH - SET IN CI SCRIPT 
# TESTING LOCALLY ONLY: BRANCH="production"

PROD_VERSION=`cat .VERSION-production`

case $BRANCH in

  development)
    DEV_VERSION=`cat .VERSION-development`

    # Increment dev version number
    NEW_DEV_VERSION=$(($DEV_VERSION +1 ))

    # Store new dev version number
    echo -n $NEW_DEV_VERSION >.VERSION-development
    git add .VERSION-development

    # Set new VERSION number
    NEW_VERSION="${PROD_VERSION}${BRANCH}${NEW_DEV_VERSION}" 
    ;;

  qa)
    QA_VERSION=`cat .VERSION-qa`

    # Increment qa version number
    NEW_QA_VERSION=$(($QA_VERSION +1 ))

    # Store new qa version number
    echo -n $NEW_QA_VERSION >.VERSION-qa
    git add .VERSION-qa
    
    # Set new VERSION number
    NEW_VERSION="${PROD_VERSION}${BRANCH}${NEW_QA_VERSION}" 
    ;;

  production)
    # break down the version number into it's components
    major=0
    minor=0
    build=0
    regex="([0-9]+).([0-9]+).([0-9]+)"
    if [[ $PROD_VERSION =~ $regex ]]; then
      major="${BASH_REMATCH[1]}"
      minor="${BASH_REMATCH[2]}"
      build="${BASH_REMATCH[3]}"
    fi

    # Increment build number
    build=$((build +1 ))

    # Store new prod version number
    NEW_PROD_VERSION="${major}.${minor}.${build}"
    echo -n $NEW_PROD_VERSION >.VERSION-production
    git add .VERSION-production

    # Set new VERSION number
    NEW_VERSION=$NEW_PROD_VERSION
    ;;

  *)
    echo "Unknown branch - aborting"
    exit
    ;;
esac

# Store new version number
echo -n $NEW_VERSION >./VERSION
git add VERSION

git commit -m "[skip CI]" # Required to avoid re-running this CI upon git push 
git tag $NEW_VERSION
git push origin HEAD --tags
