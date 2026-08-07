packer {
  required_plugins {
    amazon = {
      source  = "github.com/hashicorp/amazon"
      version = ">= 1.3.0"
    }
  }
}

variable "subnet_id" {
  type = string
}

source "amazon-ebs" "mavencrest" {
  region               = "us-east-1"
  instance_type        = "t3.small"
  ssh_username         = "ec2-user"
  iam_instance_profile = "nextjs-ec2-profile-prod"

  subnet_id = var.subnet_id

  source_ami_filter {
    filters = {
      name                = "al2023-ami-2023.*-x86_64"
      virtualization-type = "hvm"
      root-device-type    = "ebs"
    }

    owners      = ["137112412989"]
    most_recent = true
  }

  ami_name = "mavencrest-{{timestamp}}"

  tags = {
    Name        = "mavencrest"
    Environment = "prod"
    ManagedBy   = "Packer"
  }
}

build {
  sources = ["source.amazon-ebs.mavencrest"]

  provisioner "shell" {
    inline = [
      "mkdir -p /tmp/mavencrest-src"
    ]
  }

  provisioner "file" {
    source      = "/tmp/mavencrest-build/"
    destination = "/tmp/mavencrest-src"
  }

  provisioner "shell" {
    script = "${path.root}/scripts/build-app.sh"
  }

  post-processor "manifest" {
    output     = "manifest.json"
    strip_path = true
  }
}